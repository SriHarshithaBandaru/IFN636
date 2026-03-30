import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', university: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">👤</div>
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile <span className="text-indigo-500">👤</span></h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Avatar card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white shadow-md">
            {initials || '?'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{formData.name || 'Your Name'}</h2>
            <p className="text-indigo-200 text-sm">{formData.email}</p>
            {formData.university && <p className="text-indigo-300 text-xs mt-1">🎓 {formData.university}</p>}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-base font-bold text-gray-800 mb-5">Edit Information</h3>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
            <span>✅</span> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
            <input type="text" placeholder="Your name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-style" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <input type="email" placeholder="your@email.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-style" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">University</label>
            <input type="text" placeholder="e.g. Queensland University of Technology" value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="input-style" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Address</label>
            <input type="text" placeholder="Your address" value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-style" />
          </div>
          <button type="submit" disabled={saving} className="btn-primary mt-2">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
