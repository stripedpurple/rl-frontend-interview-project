module.exports = () => {
    const {commerce: {productName, price}} = require('faker')
    
    return {
        transactions: [...Array(20).keys()].map((idx) => {
            return {
                id: idx,
                description: productName(),
                expense: (price() * (Math.random() < 0.5 ? -1 : 1)).toFixed(2)
            }
        })
    }
}