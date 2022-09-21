const express = require("express");
const user = require("../models/User");

const userRoute = express.Router();

const User = require("../models/User");

//GET :  RETURN ALL USERS

userRoute.get("/", async (req, res) => {
  try {
    const result = await user.find();
    res.send(result);
  } catch (error) {
    console.log("can't find user");
  }
});

//POST :  ADD A NEW USER TO THE DATABASE

userRoute.post("/add", async (req, res) => {
  const newUser = new User(req.body);
  const result = await newUser.save();
  res.send(result);
});

//PUT : EDIT A USER BY ID

userRoute.put("/update/:id", async (req, res) => {
    try {
      const result = await user.findByIdAndUpdate({_id: req.params.id},{$set:req.body},{new:true});
      res.send({users:result, msg:"user updated"});
    } catch (error) {
      console.log("can't update user");
    }
  });

//  DELETE : REMOVE A USER BY ID

userRoute.delete("/delete/:id", async (req, res) => {
    try {
      const result = await user.findByIdAndRemove({_id: req.params.id});
      res.send({users:result, msg:"user deleted"});
    } catch (error) {
      console.log("can't delete user");
    }
  });


module.exports = userRoute;
