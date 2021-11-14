module.exports = () => {
    const uuid = ()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))

    const {commerce: {productName, price}} = require('faker')
    
    return {
        transactions: [...Array(20)].map((idx) => {
            return {
                id: uuid(),
                description: productName(),
                expense: (price() * (Math.random() < 0.5 ? -1 : 1) + Math.random()).toFixed(2)
            }
        })
    }
}