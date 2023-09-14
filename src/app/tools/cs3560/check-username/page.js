"use client";

import { useState } from "react";
import { Octokit, App } from "https://esm.sh/octokit";

const GITHUB_PROFILE_BASE_URL = "https://api.github.com/users";
const CODEWARS_PROFILE_BASE_URL = "https://www.codewars.com/users";

function Inputs() {
  const [username, setUsername] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("both");
  const [checkResult, setCheckResult] = useState([]);

  async function handleCheckBtn() {
    console.log(username);
    console.log(selectedWebsite);
    let result = [];

    if (selectedWebsite === "github" || selectedWebsite === "both") {
      try {
        let response = await fetch(`${GITHUB_PROFILE_BASE_URL}/${username}`);
        if (response.ok) {
          console.log(`${username} is valid on GitHub`);
          result.push({ username: username, website: "github", isValid: true, isSuccess: true });
        } else {
          console.log(`${username} is NOT valid on GitHub`);
          result.push({ username: username, website: "github", isValid: false, isSuccess: true });
        }
      } catch (err) {
        console.log(err);
        result.push({ username: username, website: "github", isValid: false, isSuccess: false });
      }
    }

    if (selectedWebsite === "codewars" || selectedWebsite === "both") {
    }

    setCheckResult(result);
  }

  return (
    <div className="flex flex-wrap flex-row bg-violet-50 p-10 rounded-lg w-full md:w-1/2">
      <h1 className="text-2xl">Check Username Tool</h1>
      <div className="py-12">
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Username(s)</span>
              <textarea
                id="usernameTxt"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700">What website to check?</span>
              <select
                id="websiteSel"
                value={selectedWebsite}
                onChange={(e) => setSelectedWebsite(e.target.value)}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="both">Both</option>
                <option value="github">GitHub</option>
                <option value="codewars">Codewars</option>
              </select>
            </label>
            <button
              id="checkBtn"
              onClick={handleCheckBtn}
              className="rounded-full block bg-lime-700 hover:bg-lime-600 text-white px-5 py-3 font-bold "
            >
              Check
            </button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <label className="block">
              <span className="text-gray-700">Valid Usernames</span>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled
                rows="2"
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700">Invalid Usernames</span>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled
                rows="7"
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckUsernameTool() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Inputs></Inputs>
    </main>
  );
}
