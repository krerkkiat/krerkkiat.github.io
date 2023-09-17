"use client";

import { useState, useRef, useEffect } from "react";
import { Octokit, App } from "https://esm.sh/octokit";

function Inputs() {
  const [url, setUrl] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseIdParsingErrorMsg, setCourseIdParsingErrorMsg] = useState("");

  function handleUrlChange(event) {
    const newValue = event.target.value;
    setUrl(newValue);

    if (newValue.length === 0) {
      setCourseIdParsingErrorMsg("Please enter the course ID.");
    } else if (newValue.startsWith("_")) {
      // Assume tht it is the ID.
      setCourseId(newValue);
      setCourseIdParsingErrorMsg("");
    } else {
      // Assume that a URL is passed into.
      try {
        const newUrlObj = new URL(newValue);
        const pathnameParts = newUrlObj.pathname.split("/");
        const courseIndex = pathnameParts.indexOf("courses");

        console.log(pathnameParts);
        console.log(courseIndex);

        if (courseIndex !== -1 && courseIndex + 1 < pathnameParts.length) {
          setCourseId(pathnameParts[courseIndex + 1]);
          setCourseIdParsingErrorMsg("");
        } else {
          setCourseIdParsingErrorMsg("Cannot find course's ID");
        }
      } catch (e) {
        // Parsing failed.
        setCourseIdParsingErrorMsg("Fail to parse the given URL.");
      }
    }
  }

  const membershipUrl = `https://blackboard.ohio.edu/learn/api/public/v1/courses/${courseId}/users?fields=id,userId,user,courseRoleId`;

  return (
    <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
      <div className="w-full py-12">
        <h1 className="text-2xl py-3">List of Student Fetching Tool</h1>
        <p>Generate a download link and parse the result for a student list.</p>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">A Course ID</span>
              <input
                id="courseIdTxt"
                value={url}
                onChange={handleUrlChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></input>
            </label>
            <p>
              Please visit this URL while login to Blackboard and copy the
              result into the text area below.
            </p>
            {courseIdParsingErrorMsg !== "" && (
              <p>Error parsing URL: {courseIdParsingErrorMsg}</p>
            )}
            {courseIdParsingErrorMsg === "" && (
              <p>
                URL:{" "}
                <a href={membershipUrl} target="_blank">
                  {membershipUrl}
                </a>
              </p>
            )}
            <label className="block">
              <span className="text-gray-700">Content from the above URL</span>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="5"
              ></textarea>
            </label>
            <button className="rounded-full block bg-lime-700 hover:bg-lime-600 text-white px-5 py-3 font-bold ">
              Prase
            </button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
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
