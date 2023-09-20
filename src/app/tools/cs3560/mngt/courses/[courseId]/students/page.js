"use client";

import { collection, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import {
  useFirestore,
  useFirestoreCollectionData,
  useSigninCheck,
} from "reactfire";

// Loading spinner component in react
function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <div className="text-2xl font-bold text-gray-900">Loading...</div>
    </div>
  );
}

function StudentList() {
  const firestore = useFirestore();
  const studentsCollection = collection(firestore, "students");
  const studentsQuery = query(
    studentsCollection,
    orderBy("emailHandle", "asc")
  );

  const { status: collectionLoadingStatus, data: students } =
    useFirestoreCollectionData(studentsQuery, {
      idField: "id",
    });

  let content = null;
  if (collectionLoadingStatus === "loading") {
    content = LoadingSpinner();
  } else {
    content = (
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6">
          {students.map((student) => (
            <div key={student.id}>
              {student.firstName} {student.lastName}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return content;
}

export default function ManagementTool({ params }) {
  const firestore = useFirestore();
  const studentsCollection = collection(
    firestore,
    "courses",
    params.courseId,
    "students"
  );
  const studentsQuery = query(
    studentsCollection,
    orderBy("emailHandle", "asc")
  );

  const { status: signinLoadingStatus, data: signInCheckResult } =
    useSigninCheck();

  // check for firebase permission and redirect user to the signin page if not logged in

  let content = null;
  if (signinLoadingStatus === "loading") {
    content = LoadingSpinner();
  } else if (signInCheckResult.signedIn === false) {
    content = (
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold text-gray-900">
          You are not signed in
        </div>
        <div className="text-2xl font-bold text-gray-900">
          Please <Link href="/tools/cs3560/mngt/signin">sign in</Link> to view
          this page
        </div>
      </div>
    );
  } else {
    content = <StudentList />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3 md:p-6 lg:p-24">
      <div className="flex flex-row justify-center grow bg-violet-50 p-10 rounded-lg w-full md:w-3/4 lg:1/2">
        <div className="w-full py-12">
          <h1 className="text-2xl py-3">Students</h1>
          <p>List of students</p>
          {content}
        </div>
      </div>
    </main>
  );
}
