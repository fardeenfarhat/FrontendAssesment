"use client";

import { useEffect } from "react";
import HistoryPanel from "@/components/history/HistoryPanel";
import styles from "./HistoryDrawer.module.css";

export default function HistoryDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.drawer} role="dialog" aria-label="History" aria-modal="true">
        <HistoryPanel onClose={onClose} />
      </div>
    </>
  );
}
