async function getRawProducts(model){
    return await model.dataProvider({'verb': 'get_products',});
}

async function updateProducts(model, product){
    return await model.dataProvider({'verb': 'update_product', values: [product.stock, product.id]});
}
async function createProduct(model, product){
    await model.dataProvider({'verb': 'create_product', values: [product.nombre]});
    return model.dataProvider({'verb': 'create_existence', values: [product.product_id, product.stock, product.user_id]});
}
async function editProduct(model, product){
    await model.dataProvider({'verb': 'edit_product', values: [product.product_id, product.nombre]});
    return model.dataProvider({'verb': 'edit_existence', values: [product.product_id, product.stock]});
}

module.exports = {
    getRawProducts,
    updateProducts,
    createProduct,
    editProduct,
}