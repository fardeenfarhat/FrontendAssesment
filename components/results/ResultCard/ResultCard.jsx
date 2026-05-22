"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import styles from "./ResultCard.module.css";

const ResultCard = memo(function ResultCard({ item }) {
  const [liked, setLiked] = useState(false);

  function handleDownload(e) {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = item.url;
    a.download = `generated-${item.id}.jpg`;
    a.target = "_blank";
    a.click();
  }

  function handleShare(e) {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ url: item.url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(item.url).catch(() => {});
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {item.type === "video" ? (
          <div className={styles.videoThumb}>
            <Image
              src={item.poster || item.url}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={styles.img}
            />
            <div className={styles.playOverlay} aria-hidden="true">
              <Icon name="play" size={24} />
            </div>
          </div>
        ) : (
          <Image
            src={item.url}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={styles.img}
          />
        )}

        <div className={styles.overlay} aria-hidden="true">
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${liked ? styles.liked : ""}`}
              onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Icon name="heart" size={14} />
            </button>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={handleDownload}
              aria-label="Download"
            >
              <Icon name="download" size={14} />
            </button>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={handleShare}
              aria-label="Share"
            >
              <Icon name="share" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultCard;
