import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DateSchema = new Schema({
    year: {
        type: Number
    },
    month: {
        type: Number
    },
    day: {
        type: Number
    }
})

const TimeSchema = new Schema({
    hour: {
        type: Number
    },
    minute: {
        type: Number
    }
})

const ScheduleSchema = new Schema({
    date: DateSchema,
    depart: TimeSchema,
    arrive: TimeSchema
})

export default ScheduleSchema