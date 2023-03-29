////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", async (req, res) => {
  try {
    const fruits = await Fruit.find({});
    res.render("fruits/index.ejs", { fruits });
  } catch (error) {
    console.log(error);
  }
  //console.log(fruits);
});

// new route
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// edit route
router.get("/edit/:id", async (req, res) => {
  // get the id from params
  const id = req.params.id;
  try {
    // get the fruit from the database
    const fruit = await Fruit.findById(id);
    res.render("fruits/edit.ejs", { fruit });
  } catch (error) {
    console.log(error);
  }
});

// show route
router.get("/:id", async (req, res) => {
  // get the id from params
  const id = req.params.id;
  try {
    const fruit = await Fruit.findById(id);
    res.render("fruits/show.ejs", { fruit });
  } catch(error) {
    console.log(error)
  }
  // find the particular fruit from the database
});

// create route
router.post("/", async (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // create the new fruit
  try {
    await Fruit.create(req.body);
    res.redirect("/fruits");
  } catch(error) {
    console.log(error)
  }
});

//update route
router.put("/:id", async (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  try {
    const fruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
    // redirect user back to main page when fruit
    res.render("fruits/show.ejs", { fruit });
  } catch(error) {
    console.log(error)
  }
});

router.delete("/:id", async (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  try {
    await Fruit.findByIdAndRemove(id);
    // redirect user back to index page
    res.redirect("/fruits");
  } catch(error) {
    console.log(error)
  }
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
