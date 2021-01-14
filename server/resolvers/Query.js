const Query = {
	messages(parent, args, { Message }, info) {
		const ret = Message.find({ $or: [ { from: args.query }, { to: args.query } ] }, (err, _) => {
			if (err) throw err;
		});
		return ret
	}
}

export { Query as default }
