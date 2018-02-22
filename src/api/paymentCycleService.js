const paymentCycle = require('./paymentCycle')
const errorHandler = require('./common/errorHandler')

paymentCycle.methods(['get', 'post', 'put', 'delete'])
paymentCycle.updateOptions({ new: true, runValidators: true })
paymentCycle.after('post', errorHandler).after('put', errorHandler)

paymentCycle.route('count', (req, res, next) => {
    paymentCycle.count((error, value) => {
        if(error){
            res.status(500).json({ errors: [error] })
        }else{
            res.json({ value })
        }
    })
})

paymentCycle.route('summary', (req, res, next) => {
    paymentCycle.aggregate({
        $project: { credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"} }
    },{ 
        $group:   { _id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"} }
    },{
        $project: { _id: 0, credit: 1, debt: 1 }
    },(error, result) => {
        if(error){
            res.status(500).json({ errors: [error]})
        }else{
            res.json( result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = paymentCycle