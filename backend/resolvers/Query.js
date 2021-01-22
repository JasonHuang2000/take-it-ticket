const Query = {
	allShift(parent, args, { Shift }, info) {
		const output = Shift.find((err) => {
			if (err) throw err
		})

		return output
	},
	async shift(parent, args, { Shift }, info) {
		if (args.query.departure === "" || args.query.arrival === "") {
			return null
		}
		const output = await Shift.find({ $and: [ 
			{
				departure: args.query.departure,
				arrival: args.query.arrival,
				"schedule.date.year": args.query.date.year,
				"schedule.date.month": args.query.date.month,
				"schedule.date.day": args.query.date.day
			}, {
				"schedule.depart.hour": { $gte: args.query.time.hour },
			},
		]})

		return output
	},
	async findSeat(parent, args, { Shift }, info) {
		let seat
		const output = await Shift.findOne({ trainNum: args.query.trainNum })

		if (output === null) {
			seat = {
				carriage: -1,
				seatNum: -1,
				available: false,
			}
		} else {
			seat = {
				carriage: args.query.carriage,
				seatNum: args.query.seatNum,
				available: output.seats[(args.query.carriage - 1) * 40 + args.query.seatNum - 1].available,
			}
		}

		return seat
	},
	allUser(parent, args, { User }, info) {
		const output = User.find((err) => {
			if (err) throw err
		})

		return output
	},
	async user(parent, args, { User }, info) {
		const output = await User.findOne({
			userid: args.id
		})

		if (output === null) {
			return null
		} else {
			return {
				name: output.name,
				userid: output.userid,
				password: output.password,
				history: output.history
			}
		}
		
		
	}
}

export { Query as default }
