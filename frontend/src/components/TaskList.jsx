import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  const getDeadlineStatus = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: 'Overdue', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' };
    if (diffDays <= 2) return { label: `${diffDays}d left`, color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-400' };
    if (diffDays <= 7) return { label: `${diffDays}d left`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-400' };
    return { label: `${diffDays}d left`, color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-400' };
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <div className="text-5xl mb-3">✅</div>
        <p className="text-gray-500 font-medium">No tasks yet</p>
        <p className="text-gray-400 text-sm mt-1">Add your first task above!</p>
      </div>
    );
  }

  const overdue = tasks.filter(t => new Date(t.deadline) < new Date()).length;

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Tasks', value: tasks.length, icon: '📋', color: 'from-purple-500 to-indigo-600' },
          { label: 'Overdue', value: overdue, icon: '⚠️', color: 'from-red-500 to-orange-500' },
          { label: 'On Track', value: tasks.length - overdue, icon: '✅', color: 'from-green-500 to-teal-600' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-md`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-white/80 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4">All Tasks</h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const status = getDeadlineStatus(task.deadline);
          return (
            <div key={task._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
              <div className={`h-1 ${status.dot}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-gray-800 text-base">{task.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span>📅</span>
                      <span>Due: {new Date(task.deadline).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => setEditingTask(task)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 transition-all">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)}
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

export default TaskList;
