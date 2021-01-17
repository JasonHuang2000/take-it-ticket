const Query = {
	shift(parent, args, { Shift }, info) {
		const output = Shift.find({ $and: [ 
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
		]}, (err) => {
			if (err) throw err
		})

		return output
	},
	findSeat(parent, args, { Shift }, info) {
		const output = Shift.find({ $and: [
			{ trainNum: args.query.trainNum },
			{ seats: {
				carriage: args.query.carriage,
				seatNum: args.query.seatNum
			} }
		] }, (err) => {
			if (err) throw err
		})

		return output
	},
	user(parent, args, { User }, info) {
		const output = User.find({
			userid: args.query
		}, (err) => {
			if (err) throw err
		})

		return output
	}
}

export { Query as default }
