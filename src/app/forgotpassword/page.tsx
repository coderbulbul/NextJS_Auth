"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "" });
  const [ui, setUi] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", user);
      setUi(true);
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1 className="text-4xl my-4">
        {loading ? "Processing.." : "To reset, enter your Email"}
      </h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ email: e.target.value })}
      />
      <button
        onClick={onForgotPassword}
        className={`${
          buttonDisabled ? "disabled  bg-slate-500" : ""
        }  p-2 text-bold text-black border-gray-600  bg-slate-200 rounded mt-2 rouned-lg mb-4 focus:outline-none focus:border-gray-600`}
      >
        Reset Password
      </button>
      {ui ? "Please check your email to reset password" : ""}
    </div>
  );
}
