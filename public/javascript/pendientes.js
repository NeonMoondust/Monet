const aside_selected_product_container = document.getElementById('selected_product_container');
const input_filter = document.getElementById('input_filter');
let selected_checker = [];
let alert_finalizar = true, alert_cancelar = true;
let tochange_id = 0, selected_pending_id = 0, tochange_quantity = 0;

function addProductToList(id_product){
    if(selected_checker.includes(id_product)) return alert('No se pueden agregar 2 productos del mismo tipo');
    const this_product_card = document.getElementById(`product_to_change-${id_product}`);
    aside_selected_product_container.innerHTML += `<div class="h-20 relative flex flex-row gap-4 items-center border border-solid border-black min-h-max w-11/12" id="selected_product-${id_product}">
    <div class="w-3/12 h-full border-solid border border-black">
        <img class="mx-auto h-full bg-white"  src="./assets/img_default.png">
    </div>
    <div class="flex flex-row w-4/12">
        <p class="text-md w-2/5 text-center font-bold grid items-center">ID ${id_product}</p>
        <p class="text-md w-3/5 text-center">${this_product_card.children[1].children[0].textContent}</p>
    </div>
    <div class="w-3/12 flex flex-row">
        <p class="text-xl font-bold w-2/6 grid items-center">X</p>
        <div class="w-4/6 flex flex-col gap-1">
            <p class="text-sm">stock: ${this_product_card.children[1].children[1].textContent.split(' ')[1]}</p>
            <input id="input_to_change-${id_product}" type="number" class="text-xl font-bold text-center h-2/5" value="1">
        </div>
    </div>
    <button type="button" class="w-2/12 bg-red-700 hover:bg-red-800 text-white font-bold content-center border border-solid border-black h-full" onclick="deleteFromProductList(${id_product})">Eliminar</button>
</div>`
    selected_checker.push(id_product);
}

function deleteFromProductList(id_product){
    let to_delete = document.getElementById(`selected_product-${id_product}`);
    to_delete.remove();
    selected_checker = selected_checker.filter(selected => selected != id_product);
}

function filterCardProducts(){
    const all_card_div = document.getElementById('select_card_container').querySelectorAll('.filter_class');
    all_card_div.forEach(card_div => {
        if(input_filter.value == '') card_div.parentNode.style = "";
        else if(!card_div.children[0].textContent.toLowerCase().includes(input_filter.value.toLowerCase())) card_div.parentNode.style = "display: none;"
        else card_div.parentNode.style = ""
    });
}

async function finishPendingOrder(id_transferencia){
    if(alert_cancelar){
        if(confirm('Esta seguro que quiere finalizar esta orden?')){
            await axios.put('/pendientes/finalizar', {
                id: id_transferencia
            });
            window.location.reload();
        }
    }else{
        await axios.put('/pendientes/finalizar', {
            id: id_transferencia
        });
        window.location.reload();
    }
}

async function cancelPendingOrder(id_transferencia, cantidad, id_product){
    if(alert_cancelar){
        if(confirm('Esta seguro que quiere cancelar esta orden?')){
            await axios.put('/pendientes/cancelar', {
                id: id_transferencia
            });
            await axios.put('/dashboard/addProduct', {
                products_toAdd:[{product_id: id_product, quantity: cantidad,}]
            })
            window.location.reload();
        }
    }else{
        await axios.put('/pendientes/cancelar', {
            id: id_transferencia
        });
        await axios.put('/dashboard/addProduct', {
            products_toAdd:[{product_id: id_product, quantity: cantidad,}]
        })
        window.location.reload();
    }
}

async function changePendingOrder(id, cantidad, id_product){
    const output = document.getElementById('output');
    const this_board = document.getElementById(`pending_board-${id}`);
    output.src = this_board.children[0].children[0].src;
    tochange_id = id_product;
    selected_pending_id = id;
    tochange_quantity = cantidad;
}

async function finalizarYcambiar(){
    const to_change_products = document.getElementById('selected_product_container').querySelectorAll('input[type="number"]');
    if((!to_change_products || !to_change_products.length) || (!tochange_id || !to_change_products || !tochange_quantity)) return;
    const aux_array = [];
    to_change_products.forEach(product_input => {
        aux_array.push({product_id: +product_input.id.split('-')[1], quantity: product_input.value < 0 ? 0 :
        product_input.value > +product_input.parentNode.children[0].textContent.split(' ')[1] ?
        +product_input.parentNode.children[0].textContent.split(' ')[1] : +product_input.value});
    });
    await axios.put('/pendientes/cancelar', {
        id: selected_pending_id
    });
    await axios.put('/dashboard/addProduct', {
        products_toAdd:[{product_id: tochange_id, quantity: tochange_quantity,}]
    })
    await axios.put('/dashboard/decreaseProduct', {
        products_toDecrease: aux_array,
    })
    window.location.reload();
}

function swapFinalizar(){
    alert_finalizar = !alert_finalizar;
    const this_img = document.getElementById('swapFinalizar');
    if(alert_finalizar) {
        this_img.src = './assets/pendientes/campanita_alerta_on.png';
        this_img.nextSibling.nextSibling.textContent = 'On'
    }else {
        this_img.src = './assets/pendientes/campanita_alerta_off.png';
        this_img.nextSibling.nextSibling.textContent = 'Off';
    }
}
function swapCancelar(){
    alert_cancelar = !alert_cancelar;
    const this_img = document.getElementById('swapCancelar');
    if(alert_cancelar) {
        this_img.src = './assets/pendientes/campanita_alerta_on.png';
        this_img.nextSibling.nextSibling.textContent = 'On'
    }else {
        this_img.src = './assets/pendientes/campanita_alerta_off.png';
        this_img.nextSibling.nextSibling.textContent = 'Off';
    }
}