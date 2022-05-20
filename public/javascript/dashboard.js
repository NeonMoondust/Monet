const product_side_container = document.getElementById('selected_product_container');
const input_filter = document.getElementById('input_filter');
const side_checker = [];
// document.onclick = (e) => {
//     console.log(e.target);
// };

async function addProductToSide(id_product){
    if(side_checker.includes(id_product)) return alert('No se pueden agregar 2 productos del mismo tipo');
    const product_div = document.getElementById(`producto-${id_product}`);
    product_side_container.innerHTML += `
    <div class="aside_element h-28 relative flex flex-row gap-8 items-center border border-solid border-black min-h-max">
    <div class="w-3/12 h-full border-solid border border-black relative">
        <img class="absolute inset-y-3" src="./assets/img_default.png">
    </div>
    <div>
        <p class="text-xl">ID ${id_product}</p>
        <p class="text-xl">${product_div.childNodes[5].firstChild.nextSibling.textContent}</p>
    </div>
    <p class="text-xl font-bold">X</p>
    <input id="side_product_input-${id_product}" type="number" value="1" class="w-20 h-10 text-center">
    <div class="absolute flex flex-row gap-2 bottom-0 left-1/2">
        <div class="flex flex-row-reverse gap-2">
            <label class="text-sm" for="abono">Abono</label>
            <input type="radio" name="pago-${id_product}" id="rdo_abono-${id_product}" checked>
        </div>
        <div class="flex flex-row-reverse gap-2">
            <label class="text-sm" for="pagada">Pagada</label>
            <input type="radio" name="pago-${id_product}" id="rdo_pagada-${id_product}">
        </div>
    </div>
</div>`
    side_checker.push(id_product);
}

async function addOneProduct(id_product){
    await axios.put('/dashboard/addProduct', {
        products_toAdd:[{product_id: id_product, quantity: 1,}]
    })
    await axios.post('/dashboard/transferencia', {
        cantidad: 1,
        id_producto: id_product,
        es_abono: false,
        esta_pagado: false,
    });
    window.location.reload();
}

async function decreaseOneProduct(id_product){
    await axios.put('/dashboard/decreaseProduct', {
        products_toDecrease:[{product_id: id_product, quantity: 1,}]
    })
    await axios.post('/dashboard/transferencia', {
        cantidad: 1,
        id_producto: id_product,
        es_abono: false,
        esta_pagado: true
    });
    window.location.reload();
}

async function finalizarRebaje(){
    const container_input = product_side_container.querySelectorAll('input[type="number"]');
    if(!container_input || !container_input.length) return;
    const aux_array = [];
    container_input.forEach( async product_input => {
        aux_array.push({product_id: +product_input.id.split('-')[1], quantity: product_input.value < 0 ? 0 : +product_input.value});
        await axios.post('/dashboard/transferencia', {
            cantidad: +product_input.value,
            id_producto: +product_input.id.split('-')[1],
            es_abono: true,
            esta_pagado: false
        });
    });
    await axios.put('/dashboard/decreaseProduct', {
        products_toDecrease: aux_array,
    })
    window.location.reload();
}

function product_filter(){
    const all_products_div = document.getElementById('product_container').querySelectorAll('.filter_class');
    all_products_div.forEach(product_div => {
        if(input_filter.value == '') product_div.parentNode.style = "";
        else if(!product_div.children[0].textContent.toLowerCase().includes(input_filter.value.toLowerCase())) product_div.parentNode.style = "display: none;"
        else product_div.parentNode.style = ""
    });
}