"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    token: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onResetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/resetpassword", { user });
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  //split token from url & update user object
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({ ...user, token: urlToken });
  }, []);

  return (
    <div className="text-white flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl text-green-500">
        {loading ? "Processing" : "Reset Password"}
      </h1>

      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <label htmlFor="password">Confirm Password</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="password"
        value={user.confirmPassword}
        placeholder="Confirm password"
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />

      <button
        onClick={onResetPassword}
        className={` ${
          buttonDisabled ? "disabled bg-gray-300" : ""
        } p-2 text-bold text-black border-gray-600  bg-slate-200 rounded mt-2 rouned-lg mb-4 focus:outline-none focus:border-gray-600`}
      >
        Reset Password
      </button>
    </div>
  );
}
