import mongoose from 'mongoose'
import RecordSchema from './record.js'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
	},
	userid: {
		type: String,
	},
	password: {
		type: String,
	},
	history: [RecordSchema]
})

const User = mongoose.model('User', UserSchema)

export default User
