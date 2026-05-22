"use client";

import Collapsible from "@/components/ui/Collapsible";
import styles from "./AdvancedPanel.module.css";

export default function AdvancedPanel() {
  return (
    <Collapsible title="Advanced">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cfg-scale">
            CFG Scale
          </label>
          <input
            id="cfg-scale"
            type="range"
            min="1"
            max="20"
            defaultValue="7"
            className={styles.range}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="steps">
            Steps
          </label>
          <input
            id="steps"
            type="range"
            min="10"
            max="50"
            defaultValue="20"
            className={styles.range}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="seed">
            Seed
          </label>
          <input
            id="seed"
            type="number"
            placeholder="Random"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="negative-prompt">
            Negative Prompt
          </label>
          <textarea
            id="negative-prompt"
            className={styles.textarea}
            placeholder="What to avoid..."
            rows={2}
          />
        </div>
      </div>
    </Collapsible>
  );
}
