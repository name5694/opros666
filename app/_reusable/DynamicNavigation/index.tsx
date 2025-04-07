"use client";
import NavigationPatch from "@/app/_reusable/NavigationPatch";
import dynamic from "next/dynamic";

export const DynamicNavigation = dynamic(() => import("../Navigation"), {
  loading: NavigationPatch,
  ssr: false,
});
