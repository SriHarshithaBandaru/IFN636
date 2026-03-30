import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const categoryConfig = {
  Cardio:      { color: "bg-red-100 text-red-700 border-red-200",     icon: "🏃", bar: "bg-red-400" },
  Strength:    { color: "bg-blue-100 text-blue-700 border-blue-200",   icon: "🏋️", bar: "bg-blue-400" },
  Flexibility: { color: "bg-green-100 text-green-700 border-green-200",icon: "🧘", bar: "bg-green-400" },
  Balance:     { color: "bg-purple-100 text-purple-700 border-purple-200",icon: "⚖️",bar: "bg-purple-400" },
  HIIT:        { color: "bg-orange-100 text-orange-700 border-orange-200",icon: "⚡",bar: "bg-orange-400" },
  Other:       { color: "bg-gray-100 text-gray-700 border-gray-200",  icon: "💪", bar: "bg-gray-400" },
};

const WorkoutList = ({ workouts, setWorkouts, setEditingWorkout }) => {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await axios.delete(`/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWorkouts(workouts.filter((w) => w._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete");
    }
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <div className="text-5xl mb-3">🏋️</div>
        <p className="text-gray-500 font-medium">No workouts yet</p>
        <p className="text-gray-400 text-sm mt-1">Log your first workout above to get started!</p>
      </div>
    );
  }

  const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Workouts", value: workouts.length, icon: "🏋️", color: "from-indigo-500 to-purple-600" },
          { label: "Total Minutes", value: totalMinutes, icon: "⏱️", color: "from-blue-500 to-cyan-600" },
          { label: "Calories Burned", value: totalCalories, icon: "🔥", color: "from-orange-500 to-red-500" },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-md`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-white/80 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4">Your Workouts</h2>

      <div className="space-y-3">
        {workouts.map((workout) => {
          const cfg = categoryConfig[workout.category] || categoryConfig.Other;
          return (
            <div key={workout._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
              <div className={`h-1 ${cfg.bar}`} />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{cfg.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 text-base leading-tight">{workout.exerciseName}</h3>
                        <p className="text-xs text-gray-400">{new Date(workout.date).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</p>
                      </div>
                      <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                        {workout.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-1.5">
                        <span className="text-xs">⏱️</span>
                        <span className="text-xs font-semibold text-gray-600">{workout.duration} min</span>
                      </div>
                      {workout.sets > 0 && (
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs">🔁</span>
                          <span className="text-xs font-semibold text-gray-600">{workout.sets} sets × {workout.reps} reps</span>
                        </div>
                      )}
                      {workout.weight > 0 && (
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs">⚖️</span>
                          <span className="text-xs font-semibold text-gray-600">{workout.weight} kg</span>
                        </div>
                      )}
                      {workout.caloriesBurned > 0 && (
                        <div className="flex items-center gap-1.5 bg-orange-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs">🔥</span>
                          <span className="text-xs font-semibold text-orange-600">{workout.caloriesBurned} kcal</span>
                        </div>
                      )}
                    </div>

                    {workout.notes && (
                      <p className="text-xs text-gray-400 mt-3 italic bg-gray-50 px-3 py-2 rounded-lg">
                        "{workout.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button onClick={() => setEditingWorkout(workout)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 transition-all">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(workout._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutList;
