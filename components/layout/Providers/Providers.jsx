"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { GenerationProvider } from "@/context/GenerationProvider";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <GenerationProvider>{children}</GenerationProvider>
    </ThemeProvider>
  );
}
