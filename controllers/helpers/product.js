async function getRawProducts(model){
    return await model.dataProvider({'verb': 'get_products',});
}

async function addProducts(model, product){
    return await model.dataProvider({'verb': 'add_product', values: [product.stock, product.id]});
}

module.exports = {
    getRawProducts,
    addProducts,
}