async function getRawProducts(model){
    return await model.dataProvider({'verb': 'get_products',});
}

async function updateProducts(model, product){
    return await model.dataProvider({'verb': 'update_product', values: [product.stock, product.id]});
}

module.exports = {
    getRawProducts,
    updateProducts,
}