import mongoose from 'mongoose'
import SeatSchema from './seat.js'

const Schema = mongoose.Schema

const RecordSchema = new Schema({
    trainNum: {
        type: Number
    },
    seat: SeatSchema
})

export default RecordSchema
