const nodeRestFul = require('node-restful')
const mongoose = nodeRestFul.mongoose

const creditSchema = new mongoose.Schema({
    name:  { type: String, required: false },
    value: { type: Number, min: 0, required: false }
})

const debtSchema = new mongoose.Schema({
    name:   { type: String, required: false },
    value:  { type: Number, min: 0, required:false },
    status: { type: String, required: false, uppercase: true,
              enum: ['PAGO', 'PENDENTE', 'AGENDADO']}
})

const paymentCycleSchema = new mongoose.Schema({
    month:  { type: String, required: true },
    day : { type: Number, min: 1, max: 31, required: true },
    year:  { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts:  [debtSchema]
})

module.exports = nodeRestFul.model('paymentCycle', paymentCycleSchema)