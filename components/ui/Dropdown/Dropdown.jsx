"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Dropdown.module.css";

export default function Dropdown({ value, options, onChange, placeholder = "Select…", className, variant }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className={cn(styles.root, className)}>
      <button
        type="button"
        className={cn(styles.trigger, variant === "pill" && styles.triggerPill)}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.label}>{selected ? selected.label : placeholder}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul role="listbox" className={styles.menu}>
          {options.map((opt) => (
            <li
              key={opt.id}
              role="option"
              aria-selected={opt.id === value}
              className={cn(styles.option, opt.id === value && styles.selected)}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.badge && <span className={styles.badge}>{opt.badge}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
