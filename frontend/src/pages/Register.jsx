import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="bg-surface border-[1.5px] border-border rounded-[14px] px-8 py-10 light:bg-white light:border-gray-200">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-br from-accent to-purple-400 bg-clip-text text-transparent mb-1">
          Create Account
        </h1>
        <p className="text-center text-[#8888a8] text-sm mb-8 light:text-gray-500">
          Get started with your to-do list
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-[var(--color-danger)] px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#8888a8] light:text-gray-500"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 placeholder:text-[#8888a8] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:placeholder:text-gray-400 light:border-gray-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#8888a8] light:text-gray-500"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 placeholder:text-[#8888a8] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:placeholder:text-gray-400 light:border-gray-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#8888a8] light:text-gray-500"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="px-4 py-3 bg-[#0f0f1a] border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 placeholder:text-[#8888a8] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:bg-gray-50 light:text-gray-800 light:placeholder:text-gray-400 light:border-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 bg-accent text-white font-semibold text-[0.95rem] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_4px_18px_var(--color-accent-glow)] hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[#8888a8] light:text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent font-medium no-underline hover:text-purple-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
