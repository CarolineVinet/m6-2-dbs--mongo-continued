const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

console.log("MONGO_URI", MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seats = {};
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      _id: `${row[r]}-${s}`,
      price: 225,
      isBooked: false,
    };
  }
}

const seatsToInsert = Object.values(seats);

const batchImport = async (req, res) => {
  try {
    console.log(1);
    const client = await MongoClient(MONGO_URI, options);
    console.log(2);
    await client.connect();
    console.log(3);
    const db = client.db("mongodb_day2");
    console.log(4);
    console.log("connected!");

    const r = await db.collection("seats").insertMany(seatsToInsert);
    console.log(5);
    assert.equal(seats.length, r.insertedCount);
    // res.status(201).json({ status: 201, data: req.body });
    console.log(r);

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err);
    // res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

batchImport();
