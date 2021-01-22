import mongoose from 'mongoose'
import SeatSchema from './seat.js'

const Schema = mongoose.Schema

const RecordSchema = new Schema({
    trainNum: {
        type: Number
    },
    seat: SeatSchema,
    departure: {
        type: String
    },
    arrival: {
        type: String
    }
})

export default RecordSchema
