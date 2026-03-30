import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const WorkoutForm = ({ workouts, setWorkouts, editingWorkout, setEditingWorkout }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const emptyForm = {
    exerciseName: "", category: "Strength", duration: "",
    sets: "", reps: "", weight: "", caloriesBurned: "",
    notes: "", date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(emptyForm);

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
        date: editingWorkout.date ? new Date(editingWorkout.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      });
      setOpen(true);
    }
  }, [editingWorkout]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingWorkout) {
        const { data } = await axios.put(`/api/workouts/${editingWorkout._id}`, formData, config);
        setWorkouts(workouts.map((w) => (w._id === editingWorkout._id ? data : w)));
        setEditingWorkout(null);
      } else {
        const { data } = await axios.post("/api/workouts", formData, config);
        setWorkouts([data, ...workouts]);
      }
      setFormData(emptyForm);
      setOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditingWorkout(null);
    setFormData(emptyForm);
    setOpen(false);
  };

  return (
    <div className="mb-6">
      {!open && !editingWorkout ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-indigo-300 text-indigo-600 font-semibold
                     hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Log New Workout
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">🏋️</span>
              {editingWorkout ? "Edit Workout" : "Log New Workout"}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Exercise Name *</label>
                <input type="text" name="exerciseName" value={formData.exerciseName} onChange={handleChange}
                  placeholder="e.g. Bench Press, Running" className="input-style" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-style" required>
                  {["Cardio","Strength","Flexibility","Balance","HIIT","Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Duration (min) *</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange}
                  placeholder="30" className="input-style" min="1" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="input-style" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Sets</label>
                <input type="number" name="sets" value={formData.sets} onChange={handleChange}
                  placeholder="3" className="input-style" min="0" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Reps</label>
                <input type="number" name="reps" value={formData.reps} onChange={handleChange}
                  placeholder="12" className="input-style" min="0" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange}
                  placeholder="50" className="input-style" min="0" step="0.5" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Calories Burned</label>
                <input type="number" name="caloriesBurned" value={formData.caloriesBurned} onChange={handleChange}
                  placeholder="200" className="input-style" min="0" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange}
                placeholder="Any notes about your workout..." className="input-style resize-none" rows="2" />
            </div>
            <div className="mt-5 flex gap-3">
              <button type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600
                           hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md">
                {editingWorkout ? "Update Workout" : "Save Workout"}
              </button>
              <button type="button" onClick={handleCancel}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkoutForm;
