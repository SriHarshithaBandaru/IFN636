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

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Personal Workout Tracker
      </h1>
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
