import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const categoryColors = {
  Cardio: "bg-red-100 text-red-800",
  Strength: "bg-blue-100 text-blue-800",
  Flexibility: "bg-green-100 text-green-800",
  Balance: "bg-purple-100 text-purple-800",
  HIIT: "bg-orange-100 text-orange-800",
  Other: "bg-gray-100 text-gray-800",
};

const WorkoutList = ({ workouts, setWorkouts, setEditingWorkout }) => {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      await axios.delete(`/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWorkouts(workouts.filter((w) => w._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete workout");
    }
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">No workouts logged yet.</p>
        <p className="text-sm mt-1">Start by adding your first workout above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Your Workouts ({workouts.length})
      </h2>
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <div
            key={workout._id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {workout.exerciseName}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      categoryColors[workout.category] || categoryColors.Other
                    }`}
                  >
                    {workout.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {workout.duration} min
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(workout.date).toLocaleDateString()}
                  </div>
                  {workout.sets > 0 && (
                    <div>
                      <span className="font-medium">Sets:</span> {workout.sets}
                    </div>
                  )}
                  {workout.reps > 0 && (
                    <div>
                      <span className="font-medium">Reps:</span> {workout.reps}
                    </div>
                  )}
                  {workout.weight > 0 && (
                    <div>
                      <span className="font-medium">Weight:</span>{" "}
                      {workout.weight} kg
                    </div>
                  )}
                  {workout.caloriesBurned > 0 && (
                    <div>
                      <span className="font-medium">Calories:</span>{" "}
                      {workout.caloriesBurned}
                    </div>
                  )}
                </div>

                {workout.notes && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    {workout.notes}
                  </p>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditingWorkout(workout)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(workout._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
