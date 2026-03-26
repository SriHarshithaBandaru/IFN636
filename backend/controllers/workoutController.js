const Workout = require("../models/Workout");

// @desc    Get all workouts for logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single workout by ID
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Make sure the logged-in user owns this workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
  try {
    const {
      exerciseName,
      category,
      duration,
      sets,
      reps,
      weight,
      caloriesBurned,
      notes,
      date,
    } = req.body;

    const workout = await Workout.create({
      user: req.user._id,
      exerciseName,
      category,
      duration,
      sets: sets || 0,
      reps: reps || 0,
      weight: weight || 0,
      caloriesBurned: caloriesBurned || 0,
      notes: notes || "",
      date: date || Date.now(),
    });

    res.status(201).json(workout);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Make sure the logged-in user owns this workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedWorkout);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Make sure the logged-in user owns this workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
