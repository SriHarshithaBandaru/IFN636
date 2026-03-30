import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const emptyForm = { title: '', description: '', deadline: '' };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        deadline: editingTask.deadline ? new Date(editingTask.deadline).toISOString().split('T')[0] : '',
      });
      setOpen(true);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData(emptyForm);
      setOpen(false);
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setFormData(emptyForm);
    setOpen(false);
  };

  return (
    <div className="mb-6">
      {!open && !editingTask ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-purple-300 text-purple-600 font-semibold
                     hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Add New Task
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm">✅</span>
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 text-xl font-light">×</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title *</label>
              <input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-style"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
              <textarea
                placeholder="Task description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-style resize-none"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Deadline *</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="input-style"
                required
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600
                           hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md">
                {editingTask ? 'Update Task' : 'Save Task'}
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

export default TaskForm;
