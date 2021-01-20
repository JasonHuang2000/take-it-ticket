import mongoose from 'mongoose'
import SeatSchema from './seat.js'

const Schema = mongoose.Schema

const RecordSchema = new Schema({
    total: {
        type: Number
    },
    trainNum: {
        type: Number
    },
    seat: [SeatSchema]
})

export default RecordSchema
