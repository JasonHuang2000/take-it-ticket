import mongoose from 'mongoose'
import ScheduleSchema from './schedule'
import SeatSchema from './seat'

const Schema = mongoose.Schema

const ShiftSchema = new Schema({
    trainNum: {
        type: Number
    },
    schedule: ScheduleSchema,
    departure: {
        type: String
    },
    arrival: {
        type: String
    },
    seats: [SeatSchema]
})

const Shift = mongoose.model('Shift', ShiftSchema)

export default Shift