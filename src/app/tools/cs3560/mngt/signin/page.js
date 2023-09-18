"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "reactfire";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInErrorMsg, setSignInErrorMsg] = useState("");

  const auth = useAuth();
  const router = useRouter();

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      router.push("/tools/cs3560/mngt");
    } catch (e) {
      console.log(e);
      setSignInErrorMsg("Invalid email address or password");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
        <div className="w-full py-12">
          <h1 className="text-2xl py-3">Signin</h1>
          <div className="mt-8">
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 gap-6"
            >
              <div className="mb-4">
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="emailAddress"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                />
              </div>
              <p>{signInErrorMsg}</p>
              <button
                className="rounded-full block bg-lime-700 hover:bg-lime-600 text-white px-5 py-3 font-bold"
                type="submit"
              >
                Signin
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
