const Mutation = {
	createUser(parent, args, { User }, info) {
		const doc = {
			name: args.data.name,
			userid: args.data.userid,
			password: args.data.password,
			history: []
		}

		User.create(doc, (err) => {
			if (err) throw err
		})
	},
	createShift(parent, args, { Shift }, info) {
		let i, j
		const seatarr = []
		for (i = 0; i < 5; i++) {
			for (j = 0; j < 40; j++) {
				seatarr.push({
					carriage: i,
					seatNum: j,
					available: false,
				})
			}
		}

		const doc = {
			trainNum: args.data.trainNum,
			schedule: args.data.schedule,
			departure: args.data.departure,
			arrival: args.data.arrival,
			seats: seatarr
		}

		Shift.create(doc, (err) => {
			if (err) throw err
		})
	},
	updateSeat(parent, args, { Shift }, info) {
		Shift.update({
			trainNum: args.data.trainNum,
			seats: {
				carriage: args.data.carriage,
				seat: args.data.seat
			}
		}, {
			$set: {
				"seats.$": { available: args.data.available }
			}
		}, (err) => {
			if (err) throw err
		})
	},
	deleteUser(parent, args, { User }, info) {
		User.deleteOne({
			userid: args.id
		}, (err) => {
			if (err) throw err
		})
	}
}

export { Mutation as default }