"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import HistoryThumbnail from "@/components/history/HistoryThumbnail";
import styles from "./HistoryPill.module.css";

export default function HistoryPill() {
  const { history } = useGenerationState();
  const { loadHistory } = useGenerationDispatch();

  if (!history.length) return null;

  return (
    <div className={styles.wrapper} aria-label="Recent generations">
      <div className={styles.pill}>
        <div className={styles.historyLabel}>
          <span className={styles.historyTitle}>History</span>
          <span className={styles.viewAll}>View all</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.scroll} role="list">
          {history.slice(0, 30).map((entry) => (
            <div key={entry.id} role="listitem" className={styles.item}>
              <HistoryThumbnail entry={entry} size="strip" onClick={loadHistory} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
