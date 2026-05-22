"use client";

import { cn } from "@/lib/utils/cn";
import styles from "./SegmentedControl.module.css";

export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div className={styles.root} role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          className={cn(styles.tab, opt.value === value && styles.active)}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon && <span className={styles.icon} aria-hidden="true">{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
