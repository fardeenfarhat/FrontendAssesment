"use client";

import { useThemeContext } from "@/context/ThemeProvider";
import IconButton from "@/components/ui/IconButton";
import Icon from "@/components/ui/Icon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <IconButton
      label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
    </IconButton>
  );
}
