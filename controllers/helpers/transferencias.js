async function getPendingProducts(model){
    return await model.dataProvider({'verb': 'get_pendingProducts',});
}

async function finishPendingProduct(model, id){
    return await model.dataProvider({'verb': 'finish_pendingProducts', values:[id]});
}
async function cancelPendingProduct(model, id){
    return await model.dataProvider({'verb': 'cancel_pendingProducts', values:[id]});
}

module.exports = {
    getPendingProducts,
    finishPendingProduct,
    cancelPendingProduct,
}