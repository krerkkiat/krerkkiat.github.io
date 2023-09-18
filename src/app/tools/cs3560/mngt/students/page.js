"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";

import { useFirestore, useFirestoreCollectionData } from "reactfire";

export default function ManagementTool() {
  const firestore = useFirestore();
  const studentsCollection = collection(firestore, "students");
  const studentsQuery = query(
    studentsCollection,
    orderBy("emailHandle", "asc")
  );

  const { status, data: students } = useFirestoreCollectionData(studentsQuery, {
    idField: "id",
  });

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
        <span>loading...</span>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
        <div className="w-full py-12">
          <h1 className="text-2xl py-3">Students</h1>
          <p>List of students</p>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              {students.map((student) => (
                <div key={student.id}>
                  {student.firstName} {student.lastName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
