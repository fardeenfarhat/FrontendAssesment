"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import HistoryThumbnail from "@/components/history/HistoryThumbnail";
import styles from "./HistoryStrip.module.css";

export default function HistoryStrip() {
  const { history } = useGenerationState();
  const { loadHistory } = useGenerationDispatch();

  if (!history.length) return null;

  return (
    <div className={styles.strip} role="list" aria-label="Recent generations">
      {history.slice(0, 20).map((entry) => (
        <div key={entry.id} role="listitem">
          <HistoryThumbnail entry={entry} size="strip" onClick={loadHistory} />
        </div>
      ))}
    </div>
  );
}
