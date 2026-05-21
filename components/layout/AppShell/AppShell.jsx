"use client";

import Header from "@/components/layout/Header";
import HistoryPill from "@/components/history/HistoryPill";
import PromptCard from "@/components/prompt/PromptCard";
import ResultsGrid from "@/components/results/ResultsGrid";
import styles from "./AppShell.module.css";

export default function AppShell() {
  return (
    <div className={styles.root}>
      <Header />
      <HistoryPill />

      <div className={styles.body}>
        <aside className={styles.promptWrap}>
          <PromptCard />
        </aside>
        <main className={styles.resultsWrap}>
          <ResultsGrid />
        </main>
      </div>
    </div>
  );
}
