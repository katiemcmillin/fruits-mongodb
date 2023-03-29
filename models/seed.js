///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Fruit = require("./fruit");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];
  const seed = async () => {
    // Delete all fruits
    await Fruit.deleteMany({});
    // Seed Starter Fruits
    const data = await Fruit.insertMany(startFruits);
    // log the create fruits to confirm
    console.log("--------FRUITS CREATED----------");
    return data

    // close the DB connection
  };
  seed().then(() => mongoose.connection.close());
});

///////////////////////////////////////////////
// Write your Seed Code Above
//////////////////////////////////////////////
