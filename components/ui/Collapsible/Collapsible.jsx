"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Collapsible.module.css";

export default function Collapsible({ title, children, defaultOpen = false, className }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn(styles.root, className)}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.title}>{title}</span>
        <svg
          className={cn(styles.icon, open && styles.iconOpen)}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
}
