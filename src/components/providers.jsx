"use client";

import { BearerProvider } from "../lib/IGDB/IGDBBearerTokenContext";

export function Providers({ children }) {
  return <BearerProvider>{children}</BearerProvider>;
}
