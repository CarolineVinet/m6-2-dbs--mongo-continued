"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const NUM_OF_ROWS = 8;
const SEATS_PER_ROW = 12;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("mongodb_day2");
  console.log("connected!");

  const seats = await db.collection("seats").find().toArray();

  const seatObject = {};
  seats.forEach((seat) => {
    seatObject[seat._id] = seat;
  });

  res
    .status(200)
    .json({
      seats: seatObject,
      numOfRows: NUM_OF_ROWS,
      seatsPerRow: SEATS_PER_ROW,
    });

  client.close();
  console.log("disconnected!");
};

module.exports = { getSeats };
