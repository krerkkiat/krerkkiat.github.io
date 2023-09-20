"use client";

import { Fragment } from "react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/tools/cs3560/mngt/courses");
  return <Fragment></Fragment>;
}
