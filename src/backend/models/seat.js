import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SeatSchema = new Schema({
	carriage: {
		type: Number,
		required: [true]
	},
	seatNum: {
		type: Number,
		required: [true]
	},
	available: {
        type: Boolean,
        required: [true]
	}
})

export default SeatSchema