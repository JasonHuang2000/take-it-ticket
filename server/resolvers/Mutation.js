const Mutation = {
  createUser(parent, args, { User }, info) {
    const doc = {
      name: args.data.name,
      userid: args.data.userid,
      password: args.data.password,
      history: [],
    };

    User.create(doc, (err) => {
      if (err) throw err;
    });

    return doc;
  },
  createShift(parent, args, { Shift }, info) {
    let i, j;
    const seatarr = [];
    for (i = 1; i <= 5; i++) {
      for (j = 1; j <= 40; j++) {
        seatarr.push({
          carriage: i,
          seatNum: j,
          available: true,
        });
      }
    }

    const doc = {
      trainNum: args.data.trainNum,
      schedule: args.data.schedule,
      departure: args.data.departure,
      arrival: args.data.arrival,
      seats: seatarr,
    };

    Shift.create(doc, (err) => {
      if (err) throw err;
    });

    return doc;
  },
  async updateSeat(parent, args, { Shift }, info) {
    const idx = (args.data.carriage - 1) * 40 + args.data.seatNum - 1;
    const train = await Shift.findOne({
      trainNum: args.data.trainNum,
    });

    train.seats[idx].available = args.data.available;

    await Shift.updateOne(
      {
        trainNum: args.data.trainNum,
      },
      {
        $set: {
          seats: train.seats,
        },
      }
    );

    return {
      carriage: args.data.carriage,
      seatNum: args.data.seatNum,
      available: args.data.available,
    };
  },
  async updateRecord(parent, args, { User }, info) {
    const user = await User.findOne({
      userid: args.data.userid,
    });

    user.history.push({
      trainNum: args.data.trainNum,
      seat: {
        carriage: args.data.carriage,
        seatNum: args.data.seatNum,
        available: args.data.available,
      },
      departure: args.data.departure,
      arrival: args.data.arrival,
    });

    // clear history
    // user.history = []

    await User.updateOne(
      {
        userid: args.data.userid,
      },
      {
        $set: {
          history: user.history,
        },
      }
    );

    return user;
  },
  async deleteUser(parent, args, { User }, info) {
    const out = await User.findOne({
      userid: args.id,
    });

    User.deleteOne(
      {
        userid: args.id,
      },
      (err) => {
        if (err) throw err;
      }
    );

    return out;
  },
  async deleteShift(parent, args, { Shift }, info) {
    const out = await Shift.findOne({
      trainNum: args.id,
    });

    Shift.deleteOne(
      {
        trainNum: args.id,
      },
      (err) => {
        if (err) throw err;
      }
    );

    return out;
  },
};

export { Mutation as default };
