import React from "react";
import loading from "./loding.gif";
export default function Loading() {
  return (
    <div className="text-center">
      <img src={loading} alt="..." className="w-50" />
    </div>
  );
}
