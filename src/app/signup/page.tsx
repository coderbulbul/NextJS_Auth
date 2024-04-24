"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  //declare states here
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("test");
      console.log("Signup Success", response.data);

      //redirect to 'login' directory
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed+", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1 className="text-4xl">{loading ? "Processing.." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="username"
        value={user.username}
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onSignup}
        className="p-2 border-gray-400  bg-slate-400 rounded mt-2 rouned-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
