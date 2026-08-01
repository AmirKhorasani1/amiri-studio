import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveToken } from "@api/authApi";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(password);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
      >
        <h1 className="mb-1 text-lg font-semibold text-white">Admin Login</h1>
        <p className="mb-5 text-sm text-neutral-500">Enter the admin password to continue</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm
            text-white placeholder-neutral-600 outline-none focus:border-neutral-500"
        />

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-4 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black
            transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;