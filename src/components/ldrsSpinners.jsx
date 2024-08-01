"use client";
import { useEffect } from "react";

export default function QuantumSpinner({ size }) {
  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import("ldrs");
      quantum.register();
    }
    getLoader();
  }, []);
  return <l-quantum size={size || "45"} speed="1.75" color="black"></l-quantum>;
}
