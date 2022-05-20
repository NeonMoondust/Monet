let editMode = false; to_edit = -1;
let aside_title = document.getElementById('aside_title');
let aside_button = document.getElementById('aside_button');
let inputs = document.querySelectorAll('input');

let loadFile = (event) =>{
    let image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}

async function editProduct(id, nombre, stock){
    let photo_input = inputs[3];
    if(editMode && to_edit == id){
        to_edit = -1;
        inputs.forEach(input => input.value = '');
        photo_input.src = '';
        aside_title.textContent = 'Creacion de Productos';
        aside_button.textContent = 'Ingresar Porducto';
        return editMode = false;
    }
    to_edit = id;
    editMode = true
    inputs[0].value = id;
    inputs[1].value = stock;
    inputs[2].value = nombre;
    aside_title.textContent = 'Edicion de Producto';
    aside_button.textContent = 'Editar Producto'
}

async function asideButtonHandler(){
    if(editMode){
        await axios.put('/products/editar', {
            id: inputs[0].value,
            nombre: inputs[2].value,
            stock: +inputs[1].value
        });
        window.location.reload();
    }else{
        await axios.post('/products/crear',{
            id : inputs[0].value,
            nombre: inputs[2].value,
            stock: +inputs[1].value
        });
        window.location.reload();
    }
}