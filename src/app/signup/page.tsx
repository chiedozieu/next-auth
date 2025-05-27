"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export default function SignupPage() {
   const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      toast.success("Signup success");
    } catch (error:any) {
      toast.error(error.message);
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      // onSubmit={onSignup}
      className="flex flex-col items-center justify-center min-h-screen py-2 max-w-sm mx-auto"
    >
      <h1 className=" text-2xl font-semibold text-blue-600 mb-8">Signup</h1>
      <div className="flex flex-col gap-2 my-2 w-full">
        <label
          htmlFor="name"
          className="block text-sm text-gray-700 font-medium"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter your name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
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
        <button
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md cursor-not-allowed"
          type="submit"
          disabled
        >
          Signup
        </button>
      ) : (
        <button
          onClick={onSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer"
          type="submit"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mx-auto size-6" />
          ) : (
            "Signup"
          )}
        </button>
      )}

      <div className="flex items-center justify-center mt-4">
        <h4 className="text-gray-700">Have account</h4>
        <Link href="/login" className="text-blue-600 pl-2 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
