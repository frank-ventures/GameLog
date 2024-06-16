"use client";

import { BearerProvider } from "../lib/IGDBBearerTokenContext";

export function Providers({ children }) {
  return <BearerProvider>{children}</BearerProvider>;
}
