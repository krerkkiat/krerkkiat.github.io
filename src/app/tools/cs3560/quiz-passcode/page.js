"use client";

import React, { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generatePasscode(numberOfDigits, numberOfDash) {
  let passcode = "";
  for (let i = 0; i < numberOfDigits; i++) {
    passcode = passcode + getRandomInt(10);
  }
  return passcode;
}

export default function QuizPasscodePage() {
  const [passcode, setPasscode] = useState(generatePasscode(6, 2));

  const handleGenerate = () => {
    const newPasscode = generatePasscode(6, 2);
    setPasscode(newPasscode);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
        <div className="w-full py-12">
          <h1 className="text-2xl py-3">Quiz Passcode</h1>
          <p>Generate simple passcode for the quiz.</p>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <button
                onClick={handleGenerate}
                className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Re-generate
              </button>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <label className="block">
                <span className="text-gray-700">Passcode</span>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows="5"
                  value={passcode}
                  readOnly={true}
                ></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
