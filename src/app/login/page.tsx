"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 max-w-sm mx-auto">
      <h1 className=" text-2xl font-semibold text-blue-600 mb-8">Login</h1>

      <div className="flex flex-col gap-2 my-2 w-full">
        <label
          htmlFor="email"
          className="block text-sm text-gray-700 font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          required
          autoComplete="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col gap-2 my-2 w-full">
        <label
          htmlFor="password"
          className="block text-sm text-gray-700 font-medium"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {buttonDisabled ? (
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md cursor-not-allowed">
          Login
        </button>
      ) : (
        <button
          onClick={onLogin}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer ${loading && "animate-pulse cursor-not-allowed"}`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mx-auto size-6" />
          ) : (
            "Login"
          )}
        </button>
      )}

      <div className="flex items-center justify-center mt-4">
        <h4 className="text-gray-700">Don't have an account?</h4>
        <Link href="/signup" className="text-blue-600 pl-2 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
