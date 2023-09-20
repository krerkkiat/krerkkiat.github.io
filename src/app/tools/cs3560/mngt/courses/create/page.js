"use client";

import { Fragment, useState, useRef, useEffect } from "react";
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

export default function CourseCreatePage() {
  return <Fragment></Fragment>;
}
