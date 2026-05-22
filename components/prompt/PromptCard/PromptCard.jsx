"use client";

import MediaToggle from "@/components/prompt/MediaToggle";
import PromptInput from "@/components/prompt/PromptInput";
import GenerateButton from "@/components/prompt/GenerateButton";
import ImageCountSelector from "@/components/prompt/ImageCountSelector";
import RatioSelector from "@/components/prompt/RatioSelector";
import ModelSelector from "@/components/prompt/ModelSelector";
import AdvancedPanel from "@/components/prompt/AdvancedPanel";
import StylesPanel from "@/components/prompt/StylesPanel";
import styles from "./PromptCard.module.css";

export default function PromptCard() {
  return (
    <div className={styles.card}>
      <div className={styles.toggleWrap}>
        <MediaToggle />
      </div>

      <div className={styles.promptBox}>
        <PromptInput />
        <div className={styles.generateRow}>
          <GenerateButton />
        </div>
      </div>

      <div className={styles.controls}>
        <ImageCountSelector />
        <RatioSelector />
        <ModelSelector />
      </div>

      <div className={styles.collapsibles}>
        <AdvancedPanel />
        <StylesPanel />
      </div>
    </div>
  );
}
