import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  carriage: {
    type: Number,
  },
  seatNum: {
    type: Number,
  },
  available: {
    type: Boolean,
  },
});

export default SeatSchema;
