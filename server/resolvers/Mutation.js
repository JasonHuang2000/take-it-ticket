const Mutation = {
	createMessage(parent, args, { Message, pubsub }, info) {
		const instance = args.data
		Message.create(instance, (err, _) => {
			if (err) throw err
		})
		pubsub.publish("message", {
			message: {
				mutation: "CREATED",
				data: instance,
			}
		})
		return instance
	},
	deleteMessage(parent, args, { Message, pubsub }, info) {
		Message.deleteMany({
			$or: [ { from: args.from }, { to: args.from } ]
		}, (err) => {
			if (err) throw err
		})
		pubsub.publish("message", {
			message: {
				mutation: "DELETED",
				data: {
					from: args.from,
					to: "",
					body: "All messages have been cleared!"
				}
			}
		})
		return "Message Cleared!"
	},
	deleteAll(parent, args, { Message }, info) {
		Message.deleteMany({}, (err) => {
			if (err) throw err
		})
		return "All Deleted!"
	}
}

export { Mutation as default }
