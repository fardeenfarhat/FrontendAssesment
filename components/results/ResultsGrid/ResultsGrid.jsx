"use client";

import Image from "next/image";
import { useGenerationState } from "@/context/GenerationProvider";
import ResultCard from "@/components/results/ResultCard";
import ResultSkeleton from "@/components/results/ResultSkeleton";
import Icon from "@/components/ui/Icon";
import { defaultGridItems, defaultPrompt } from "@/lib/mocks/defaultGrid";
import styles from "./ResultsGrid.module.css";

function TextDescCard({ prompt }) {
  return (
    <div className={styles.textCard}>
      <p className={styles.textCardBody}>{prompt}</p>
      <div className={styles.textCardFooter}>
        <button type="button" className={styles.modelPill}>
          <Icon name="sparkles" size={11} />
          <span>FLUX.1 [dev]</span>
        </button>
      </div>
    </div>
  );
}

function DefaultGrid() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.prompt}>
          <Icon name="sparkles" size={13} />
          {defaultPrompt.slice(0, 80)}…
        </p>
        <span className={styles.count}>8 results</span>
      </div>
      <div className={styles.grid}>
        {defaultGridItems.map((item, i) => {
          if (item.type === "text") {
            return (
              <div key={item.id} style={{ animationDelay: `${i * 40}ms` }}>
                <TextDescCard prompt={defaultPrompt} />
              </div>
            );
          }
          return (
            <div key={item.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ResultCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ResultsGrid() {
  const { results, status, error, count } = useGenerationState();

  if (status === "loading") {
    return (
      <div className={styles.root}>
        <div className={styles.loadingHeader} aria-live="polite" aria-busy="true">
          <span className={styles.loadingSpinner} aria-hidden="true" />
          <span className={styles.loadingText}>Crafting your vision…</span>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: count }).map((_, i) => (
            <ResultSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.error} role="alert">
        <Icon name="close" size={24} />
        <p>{error || "Something went wrong. Please try again."}</p>
      </div>
    );
  }

  if (!results) {
    return <DefaultGrid />;
  }

  const items = results.items.map((item, idx) => {
    if (idx === 4 && results.items.length >= 7) {
      return { ...item, _isText: false };
    }
    return item;
  });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.prompt} title={results.prompt}>
          <Icon name="sparkles" size={13} />
          {results.prompt}
        </p>
        <span className={styles.count}>{results.items.length} results</span>
      </div>
      <div className={styles.grid}>
        {results.items.map((item, i) => (
          <div key={item.id} style={{ animationDelay: `${i * 40}ms` }}>
            <ResultCard item={item} />
          </div>
        ))}
        {results.items.length <= 4 && (
          <div style={{ animationDelay: `${results.items.length * 40}ms` }}>
            <TextDescCard prompt={results.prompt} />
          </div>
        )}
      </div>
    </div>
  );
}
