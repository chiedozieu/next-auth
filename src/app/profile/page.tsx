"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response?.data?.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setUserData(response.data.data._id);
      setUserName(response.data.data.name);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userData]);

  return (
    <div className="">
      <nav className="flex justify-end bg-amber-400 p-4">
        <ul className="flex gap-4 ">
          <li className="cursor-pointer hover:text-white">Home</li>
          <li className="cursor-pointer hover:text-white">Profile</li>
        </ul>
        <button
          onClick={logout}
          className="cursor-pointer hover:text-white ml-4"
        >
          {userData ? "Logout" : "Login"}
        </button>
      </nav>
      <h1 className="text-center text-3xl font-semibold mt-6 text-blue-500">
        Profile Page
      </h1>

      <div className="flex justify-center mt-8">
        <Link
          href={`/profile/${userData}`}
          className="bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600 rounded"
        >
          Profile: {userName}
        </Link>
      </div>
    </div>
  ); 
}
