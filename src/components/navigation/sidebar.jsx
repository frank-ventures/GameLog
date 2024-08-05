"use client";
import React, { useState } from "react";

export default function Sidebar({ isOpen, setIsOpen, userId }) {
  return (
    <>
      <button
        onClick={setIsOpen}
        className={`flex flex-col justify-center items-center gap-1 bg-orange-400 rounded-md py-3 transition-all duration-50 ease-out border-black border-[1px] z-50 ${
          isOpen ? "px-2" : "px-3"
        }`}
      >
        <span
          className={`bg-slate-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-2 w-8" : ""
          }`}
        ></span>
        <span
          className={`bg-slate-500 block transition-all duration-150 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
        ></span>
        <span
          className={`bg-slate-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-2 w-8" : ""
                    }`}
        ></span>
      </button>
    </>
  );
}
