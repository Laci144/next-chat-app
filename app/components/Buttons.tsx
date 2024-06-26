"use client";
import { signIn, signOut } from "next-auth/react";
import { updateData } from "../action";

export function ProfileButton() {
  return (
    <a href="/profile" className="text-black text-3xl font-bold mr-4">
      Profile
    </a>
  );
}

export function Logout() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3 
        text-center text-sm font-semibold text-white ring-red-300 
        transition duration-100 hover:bg-red-600 md:text-base"
    >
      Logout
    </button>
  );
}

export function NavLogin() {
  return (
    <button
      onClick={() => {
        signIn("github");
      }}
      className="flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3 
        text-center text-sm font-semibold text-white ring-teal-300 
        transition duration-100 hover:bg-teal-600 md:text-base"
    >
      Login
    </button>
  );
}

export function MainLogin() {
  return (
    <div>
      <button
        onClick={() => {
          signIn("github");
        }}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3 
        text-center text-sm font-semibold text-white ring-teal-300 
        transition duration-100 hover:bg-teal-600 md:text-base"
      >
        Login with github
      </button>
      <button
        onClick={() => {
          signIn("google");
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3 
      text-center text-sm font-semibold text-white ring-teal-300 
      transition duration-100 hover:bg-teal-600 md:text-base"
      >
        Login with google
      </button>
    </div>
  );
}
