"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1 className="text-4xl">Signup</h1>
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

      <label htmlFor="password">Password</label>
      <input
        className="p-2 rounded-md border-none outline-none text-black"
        type="text"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
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
      <button
        onClick={onSignup}
        className="p-2 border-gray-400  bg-slate-400 rounded mt-2 rouned-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Signup
      </button>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
