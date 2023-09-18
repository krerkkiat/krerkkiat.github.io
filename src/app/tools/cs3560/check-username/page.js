"use client";

import { useState, useRef, useEffect } from "react";
import { Octokit, App } from "https://esm.sh/octokit";

const GITHUB_PROFILE_BASE_URL = "https://api.github.com/users";
const CODEWARS_PROFILE_BASE_URL = "https://www.codewars.com/api/v1/users";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkGithubUsername(username) {
  try {
    let response = await fetch(`${GITHUB_PROFILE_BASE_URL}/${username}`);
    if (response.ok) {
      console.log(`${username} is valid on GitHub`);
      return {
        username: username,
        website: "github",
        isValid: true,
        isSuccess: true,
        statusCode: response.status,
      };
    } else if (response.status === 404) {
      console.log(`${username} is NOT valid on GitHub`);
      return {
        username: username,
        website: "github",
        isValid: false,
        isSuccess: true,
        statusCode: response.status,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      username: username,
      website: "github",
      isValid: false,
      isSuccess: false,
    };
  }
}

async function checkCodewarsUsername(username) {
  try {
    let response = await fetch(`${CODEWARS_PROFILE_BASE_URL}/${username}`);
    if (response.ok) {
      console.log(`${username} is valid on Codewars`);
      return {
        username: username,
        website: "codewars",
        isValid: true,
        isSuccess: true,
        statusCode: response.status,
      };
    } else if (response.status === 404) {
      console.log(`${username} is NOT valid on Codewars`);
      return {
        username: username,
        website: "codewars",
        isValid: false,
        isSuccess: true,
        statusCode: response.status,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      username: username,
      website: "codewars",
      isValid: false,
      isSuccess: false,
    };
  }
}

function Inputs() {
  const [rawUsername, setRawUsername] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("github");
  const [checkResult, setCheckResult] = useState([]);
  const validResultTextarea = useRef(null);
  const invalidResultTextarea = useRef(null);

  useEffect(() => {
    validResultTextarea.current.scrollTop =
      validResultTextarea.current.scrollHeight;
    invalidResultTextarea.current.scrollTop =
      invalidResultTextarea.current.scrollHeight;
  });

  async function handleCheckBtn() {
    let results = checkResult;

    let usernames = [];
    if (rawUsername.includes("\n")) {
      usernames = rawUsername.split("\n").map((val) => val.trim());
    } else if (rawUsername.includes(",")) {
      usernames = rawUsername.split(",").map((val) => val.trim());
    } else {
      usernames.push(rawUsername);
    }

    for (let username of usernames) {
      let result = null;
      if (selectedWebsite === "github") {
        result = await checkGithubUsername(username);
      } else if (selectedWebsite === "codewars") {
        result = await checkCodewarsUsername(username);
      }
      results = [...results, result];
      setCheckResult(results);
      await sleep(2000);
    }
  }

  const validResultText = checkResult
    .map((val, idx, arr) => {
      if (val.isValid) {
        return `[${val.website}]: ${val.username} (${val.statusCode})`;
      }
    })
    .join("\n")
    .trim();
  const invalidResultText = checkResult
    .map((val, idx, arr) => {
      if (!val.isValid) {
        return `[${val.website}]: ${val.username} (${
          val.statusCode || "offline/network error"
        })`;
      }
    })
    .join("\n")
    .trim();

  return (
    <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
      <div className="w-full py-12">
        <h1 className="text-2xl py-3">Username existence Checking Tool</h1>
        <p>Check if the username(s) exist on GitHub or Codewars or not.</p>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Username(s)</span>
              <textarea
                id="usernameTxt"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                value={rawUsername}
                onChange={(e) => {
                  setRawUsername(e.target.value);
                }}
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700">What website to check?</span>
              <select
                value={selectedWebsite}
                onChange={(e) => setSelectedWebsite(e.target.value)}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="github">GitHub</option>
                <option value="codewars">Codewars</option>
              </select>
            </label>
            <button
              id="checkBtn"
              onClick={handleCheckBtn}
              className="rounded-full block bg-lime-700 hover:bg-lime-600 text-white px-5 py-3 font-bold"
            >
              Check
            </button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <label className="block">
              <span className="text-gray-700">Valid Usernames</span>
              <textarea
                ref={validResultTextarea}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled
                rows="2"
                value={validResultText}
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700">Invalid Usernames</span>
              <textarea
                ref={invalidResultTextarea}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled
                rows="7"
                value={invalidResultText}
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
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <Inputs></Inputs>
    </main>
  );
}
