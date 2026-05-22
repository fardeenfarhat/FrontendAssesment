"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import HistoryThumbnail from "@/components/history/HistoryThumbnail";
import styles from "./HistoryPanel.module.css";

export default function HistoryPanel({ onClose }) {
  const { history } = useGenerationState();
  const { loadHistory } = useGenerationDispatch();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>History</h2>
        {onClose && (
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close history">
            ✕
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className={styles.empty}>No generations yet.</p>
      ) : (
        <div className={styles.grid}>
          {history.map((entry) => (
            <div key={entry.id} className={styles.item}>
              <HistoryThumbnail entry={entry} size="lg" onClick={loadHistory} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
