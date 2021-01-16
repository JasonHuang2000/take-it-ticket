const Query = {
	shift(parent, args, { Shift }, info) {
		const output = await Shift.find({ $and: [ 
			{ departure: args.query.departure },
			{ arrival: args.query.arrival },
			{ schedule: {
				date: {
					year: args.query.schedule.date.year,
					month: args.query.schedule.date.month,
					day: args.query.schedule.date.day
				},
				depart: {
					hour: { $gte: args.query.schedule.depart.hour },
					minute: { $gte: args.query.schedule.depart.minute }
				}
			} }
		]})

		return output
	},
	findSeat(parent, args, { Shift }, info) {
		const output = await Shift.find({ $and: [
			{ trainNum: args.query.trainNum },
			{ seats: {
				carriage: args.query.carriage,
				seatNum: args.query.seatNum
			} }
		] })

		return output
	},
	user(parent, args, { User }, info) {
		const output = await User.find({
			userid: args.query
		})

		return output
	}
}

export { Query as default }
