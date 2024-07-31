"use client";

import { BearerProvider } from "@lib/IGDB/IGDBBearerTokenContext";
import { DBUserIDProvider } from "../lib/Supabase/DBUserIdContext";

export function Providers({ children }) {
  return (
    <BearerProvider>
      <DBUserIDProvider>{children}</DBUserIDProvider>
    </BearerProvider>
  );
}
