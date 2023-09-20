"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { collection, orderBy, query } from "firebase/firestore";
import {
  useFirestore,
  useFirestoreCollectionData,
  useSigninCheck,
} from "reactfire";

function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <div className="text-2xl font-bold text-gray-900">Loading...</div>
    </div>
  );
}

function CoursesList() {
  const firestore = useFirestore();
  const coursesCollection = collection(firestore, "courses");
  const coursesQuery = query(coursesCollection, orderBy("beginDate", "dsc"));

  const { status, data: courses } = useFirestoreCollectionData(coursesQuery, {
    idField: "id",
  });

  if (status === "loading") {
    return <LoadingSpinner></LoadingSpinner>;
  } else {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {courses.map((course) => (
          <li key={course.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link href={`/tools/cs3560/mngt/courses/${course.id}`}>
                    {course.name}
                  </Link>
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {course.description}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">Active</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Begin Date
                <time dateTime={course.beginDate}>Time</time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default function CoursesListPage() {
  const router = useRouter();
  const { status: signinLoadingStatus, data: signInCheckResult } =
    useSigninCheck();

  if (signinLoadingStatus === "loading") {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <Fragment>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Courses
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    List of courses in the system.
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  <Link
                    href="/tools/cs3560/mngt/courses/create"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Create
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <CoursesList></CoursesList>
          </div>
        </main>
      </Fragment>
    );
  } else {
    router.push("/tools/cs3560/mngt/signin");
  }
}
