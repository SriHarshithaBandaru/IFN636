import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";

const Workouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("/api/workouts", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchWorkouts();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">💪</div>
          <p className="text-gray-500 font-medium">Loading your workouts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Workouts <span className="text-indigo-500">🏋️</span>
        </h1>
        <p className="text-gray-500 mt-1">Track and manage all your training sessions</p>
      </div>
      <WorkoutForm
        workouts={workouts}
        setWorkouts={setWorkouts}
        editingWorkout={editingWorkout}
        setEditingWorkout={setEditingWorkout}
      />
      <WorkoutList
        workouts={workouts}
        setWorkouts={setWorkouts}
        setEditingWorkout={setEditingWorkout}
      />
    </div>
  );
};

export default Workouts;
