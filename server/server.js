import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import User from './models/user.js'
import Shift from './models/shift.js'
import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import Subscription from './resolvers/Subscription.js'

import wakeUpDyno from './wakeUpDyno.js'

dotenv.config()

// mongodb connection
if (!process.env.MONGO_URL) {
	console.error('Missing MONGO_URL!!!')
	process.exit(1)
}
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
const db = mongoose.connection

// graphQL server
const pubsub = new PubSub()
const server = new GraphQLServer({
	typeDefs: './server/schema.graphql',
	resolvers: {
		Query,
		Mutation,
		Subscription
	},
	context: {
		User,
		Shift,
		pubsub
	}
})

if (!process.env.MONGO_URL) {
	console.error('Missing MONGO_URL!!!')
	process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const DYNO_URL = 'https://take-it-ticket-test.herokuapp.com/'
db.once('open', () => {
	console.log('MongoDB connected!')
	const PORT = process.env.port || 4000
	server.start({ port: PORT }, ({ port }) => {
		wakeUpDyno(DYNO_URL);
		console.log(`Server started, listening on port ${port} for incoming requests.`)
	})
})
