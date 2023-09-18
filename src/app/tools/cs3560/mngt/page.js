"use client";

import { useState, useRef, useEffect } from "react";

export default function ManagementTool() {
  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
        <div className="w-full py-12">
          <h1 className="text-2xl py-3">Management Tool</h1>
          <p>
            Manage students&apos; detail, teams, and checkpoint presentation.
          </p>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
