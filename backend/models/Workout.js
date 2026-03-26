const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    exerciseName: {
      type: String,
      required: [true, "Please add an exercise name"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Cardio", "Strength", "Flexibility", "Balance", "HIIT", "Other"],
    },
    duration: {
      type: Number,
      required: [true, "Please add duration in minutes"],
    },
    sets: {
      type: Number,
      default: 0,
    },
    reps: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Please add a workout date"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
