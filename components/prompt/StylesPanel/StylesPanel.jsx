"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import Collapsible from "@/components/ui/Collapsible";
import { STYLE_OPTIONS } from "@/lib/constants/styles";
import styles from "./StylesPanel.module.css";

export default function StylesPanel() {
  const { selectedStyles } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <Collapsible title="Styles">
      <div className={styles.grid}>
        {STYLE_OPTIONS.map((opt) => {
          const active = selectedStyles.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              className={`${styles.chip} ${active ? styles.active : ""}`}
              onClick={() => dispatch({ type: "TOGGLE_STYLE", payload: opt.id })}
              aria-pressed={active}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </Collapsible>
  );
}
