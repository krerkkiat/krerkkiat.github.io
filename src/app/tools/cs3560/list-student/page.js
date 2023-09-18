"use client";

import { useState, useRef, useEffect } from "react";

function Inputs() {
  const [url, setUrl] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseIdParsingErrorMsg, setCourseIdParsingErrorMsg] = useState(
    "Please enter the course ID."
  );
  const [apiRawResult, setapiRawResult] = useState("");
  const [outputOption, setOutputOption] = useState("csv");
  const [processedResult, setProcessedResult] = useState("");

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

  function handleApiResult(event) {
    setapiRawResult(event.target.value);
    try {
      const data = JSON.parse(event.target.value);
      let students = [];
      for (let member of data["results"]) {
        if (member["courseRoleId"] === "Student") {
          students.push(member);
        }
      }

      if (outputOption === "csv") {
        const output = students
          .map((val, idx, arr) => {
            return `${val.user.userName},${val.user.name.given},${val.user.name.family},${val.userId},${val.id}`;
            //return `${val.user.userName}\t${val.user.name.given}\t${val.user.name.family}\t${val.userId}\t${val.id}`;
          })
          .join("\n");
        setProcessedResult(output);
      } else if (outputOption === "json") {
        const output = JSON.stringify(students);
        setProcessedResult(output);
      }
    } catch (e) {
      console.log(e);
      setProcessedResult("Error parsing the result into JSON.");
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
              <span className="text-gray-700">Course ID</span>
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
                value={apiRawResult}
                onChange={handleApiResult}
              ></textarea>
            </label>
            <label className="inline-flex items-center">
              <input
                className="form-radio"
                type="radio"
                name="outputOptionRadio"
                value="csv"
                defaultChecked={outputOption === "csv"}
                onChange={(e) => setOutputOption(e.target.value)}
              />
              <span className="ml-2">CSV</span>
            </label>
            <label className="inline-flex items-center">
              <input
                className="form-radio"
                type="radio"
                defaultChecked={outputOption === "json"}
                name="outputOptionRadio"
                value="json"
                onChange={(e) => setOutputOption(e.target.value)}
              />
              <span className="ml-2">JSON</span>
            </label>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <label className="block">
              <span className="text-gray-700">Parsed Output</span>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="5"
                value={processedResult}
                readOnly={true}
              ></textarea>
            </label>
            <p>
              You can then copy this value to Excel or{" "}
              <a href="https://sheets.new/">Google Sheets</a>.
            </p>
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
