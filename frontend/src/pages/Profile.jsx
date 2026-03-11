import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, updateProfile } from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setForm({ name: data.name, email: data.email });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);

    try {
      const { data } = await updateProfile(form);
      localStorage.setItem("userName", data.name);
      setMessage({ type: "success", text: "Profile updated!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);

    try {
      await updateProfile(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage({ type: "success", text: "Password changed!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Password change failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#8888a8]">
        <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full mx-auto mb-4 animate-spin"></div>
        <p>Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-[#8888a8] no-underline hover:text-accent transition-colors mb-5 light:text-gray-500"
      >
        ← Back to tasks
      </Link>

      <div className="bg-surface border-[1.5px] border-border rounded-[14px] px-8 py-8 light:bg-white light:border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-br from-accent to-purple-400 bg-clip-text text-transparent mb-6">
          Profile
        </h1>

        {message.text && (
          <div
            className={`px-4 py-3 rounded-lg text-sm mb-5 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border border-red-500/30 text-[var(--color-danger)]"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile info */}
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#8888a8] light:text-gray-500">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:border-gray-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#8888a8] light:text-gray-500">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:border-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="py-3 bg-accent text-white font-semibold text-[0.95rem] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_4px_18px_var(--color-accent-glow)] hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>

        {/* Password change */}
        <div className="border-t border-border pt-6 light:border-gray-200">
          <h2 className="text-lg font-semibold text-[#e8e8f0] mb-4 light:text-gray-800">
            Change Password
          </h2>
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#8888a8] light:text-gray-500">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                required
                className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:border-gray-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#8888a8] light:text-gray-500">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                required
                minLength={6}
                className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:border-gray-200"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="py-3 bg-transparent border-[1.5px] border-border text-[#e8e8f0] font-semibold text-[0.95rem] rounded-[10px] cursor-pointer transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-60 disabled:cursor-not-allowed light:border-gray-200 light:text-gray-700"
            >
              {saving ? "Changing…" : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
