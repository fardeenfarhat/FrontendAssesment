"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import styles from "./PromptInput.module.css";

const MAX_CHARS = 500;

export default function PromptInput() {
  const { prompt } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <div className={styles.root}>
      <label htmlFor="prompt-input" className={styles.srOnly}>
        Describe what you want to generate
      </label>
      <textarea
        id="prompt-input"
        className={styles.textarea}
        value={prompt}
        onChange={(e) => dispatch({ type: "SET_PROMPT", payload: e.target.value })}
        placeholder="Describe your imagination to be converted to piece of art..."
        rows={5}
        maxLength={MAX_CHARS}
      />
      <div className={styles.charCount} aria-live="polite">
        <span className={prompt.length > MAX_CHARS * 0.9 ? styles.charCountWarn : ""}>
          {prompt.length}
        </span>
        /{MAX_CHARS}
      </div>
    </div>
  );
}
