module.exports = () => {
    const {commerce: {productName, price}} = require('faker')
    
    return {
        transactions: [...Array(20)].map(() => {
            return {
                description: productName(),
                expense: (price() * (Math.random() < 0.5 ? -1 : 1)).toFixed(2)
            }
        })
    }
}