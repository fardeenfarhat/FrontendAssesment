"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import Icon from "@/components/ui/Icon";
import styles from "./GenerateButton.module.css";

export default function GenerateButton() {
  const { status, prompt } = useGenerationState();
  const { generate } = useGenerationDispatch();
  const loading = status === "loading";

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={generate}
      disabled={loading || !prompt.trim()}
      aria-label="Generate content"
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          Generating...
        </>
      ) : (
        <>
          <Icon name="sparkles" size={16} />
          Generate
        </>
      )}
    </button>
  );
}
