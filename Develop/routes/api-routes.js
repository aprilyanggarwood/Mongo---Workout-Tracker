const Workout = require("../models/workout.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

/** Add New Exercise to Workout **/
router.post("/api/workouts", ({ body }, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch(({ message }) => {
      console.log(message);
    });
});

// Find the Workout that matches the id in the URL
// Then push exercise onto Exercise array
// new: true - always create a new one
// findByIdAndUpdate() method returns the object that matched the condition before the update operation
router.put("/api/workouts/:id", ({ params, body }, res) => {
  console.log("PARAMS", body, params);

  Workout.findOneAndUpdate(
    { _id: params.id }, // req.params.id
    { $push: { exercises: body } }, //req.body
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}, {}, { sort: { day: -1 } })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

/** Get All Workouts **/
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
