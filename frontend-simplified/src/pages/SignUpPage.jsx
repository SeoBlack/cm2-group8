import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [membership, setMembership] = useState("Free");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      phone_number: phone,
      gender,
      date_of_birth: dob,
      membership_status: membership,
    };
    console.log("SIGNUP FORM DATA:", newUser);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        throw new Error("Signup failed");
      }
      const data = await res.json();

      dispatch({ type: "LOGIN", payload: data });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="bg-indigo-50 min-h-screen">
      <div className="container m-auto max-w-2xl py-10">
        <div className="bg-white px-6 py-8 shadow-md rounded">
          <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

          <form onSubmit={submitForm}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
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

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="border rounded w-full py-2 px-3"
                placeholder="e.g. +358401234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <span className="block text-gray-700 font-bold mb-2">Gender</span>
              <div className="flex gap-6">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <span>Female</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border rounded w-full py-2 px-3"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            {/* Membership Status */}
            <div className="mb-6">
              <label
                htmlFor="membership"
                className="block text-gray-700 font-bold mb-2"
              >
                Membership Status
              </label>
              <select
                id="membership"
                name="membership"
                className="border rounded w-full py-2 px-3"
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
                required
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
