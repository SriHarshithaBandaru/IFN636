import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/workouts');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-8">💪</div>
            <h1 className="text-3xl font-bold mb-3">Welcome Back!</h1>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Track your workouts, manage your tasks, and crush your fitness goals every day.
            </p>
          </div>
          <div className="space-y-4">
            {['Log workouts in seconds', 'Track tasks & deadlines', 'Monitor your progress'].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-indigo-100">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign in</h2>
            <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-style"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-style"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-2">
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
