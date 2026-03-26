const express = require("express");
const router = express.Router();
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected - user must be logged in
router.route("/").get(protect, getWorkouts).post(protect, createWorkout);
router
  .route("/:id")
  .get(protect, getWorkoutById)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;
