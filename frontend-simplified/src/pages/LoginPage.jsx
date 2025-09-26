import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

 
    console.log("LOGIN FORM DATA:", { email, password });


    navigate("/");
  };

  return (
    <section className="bg-indigo-50 min-h-screen">
      <div className="container m-auto max-w-md py-10">
        <div className="bg-white px-6 py-8 shadow-md rounded">
          <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border rounded w-full py-2 px-3"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
