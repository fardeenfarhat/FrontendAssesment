"use client";

import { cn } from "@/lib/utils/cn";
import styles from "./IconButton.module.css";

export default function IconButton({
  children,
  label,
  active = false,
  size = "md",
  className,
  onClick,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(styles.btn, styles[size], active && styles.active, className)}
      {...props}
    >
      {children}
    </button>
  );
}
