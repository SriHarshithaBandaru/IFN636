import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const WorkoutForm = ({ workouts, setWorkouts, editingWorkout, setEditingWorkout }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    exerciseName: "",
    category: "Strength",
    duration: "",
    sets: "",
    reps: "",
    weight: "",
    caloriesBurned: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editingWorkout) {
      setFormData({
        exerciseName: editingWorkout.exerciseName || "",
        category: editingWorkout.category || "Strength",
        duration: editingWorkout.duration || "",
        sets: editingWorkout.sets || "",
        reps: editingWorkout.reps || "",
        weight: editingWorkout.weight || "",
        caloriesBurned: editingWorkout.caloriesBurned || "",
        notes: editingWorkout.notes || "",
        date: editingWorkout.date
          ? new Date(editingWorkout.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [editingWorkout]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      if (editingWorkout) {
        const { data } = await axios.put(
          `/api/workouts/${editingWorkout._id}`,
          formData,
          config
        );
        setWorkouts(
          workouts.map((w) => (w._id === editingWorkout._id ? data : w))
        );
        setEditingWorkout(null);
      } else {
        const { data } = await axios.post("/api/workouts", formData, config);
        setWorkouts([data, ...workouts]);
      }

      setFormData({
        exerciseName: "",
        category: "Strength",
        duration: "",
        sets: "",
        reps: "",
        weight: "",
        caloriesBurned: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditingWorkout(null);
    setFormData({
      exerciseName: "",
      category: "Strength",
      duration: "",
      sets: "",
      reps: "",
      weight: "",
      caloriesBurned: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editingWorkout ? "Edit Workout" : "Log New Workout"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exercise Name *
          </label>
          <input
            type="text"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            placeholder="e.g., Bench Press, Running"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Balance">Balance</option>
            <option value="HIIT">HIIT</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (minutes) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sets
          </label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            placeholder="3"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reps
          </label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            placeholder="12"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="50"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Calories Burned
          </label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            placeholder="200"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes about your workout..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingWorkout ? "Update Workout" : "Add Workout"}
        </button>
        {editingWorkout && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;
