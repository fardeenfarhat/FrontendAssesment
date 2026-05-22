"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils/cn";
import Icon from "@/components/ui/Icon";
import styles from "./HistoryThumbnail.module.css";

const HistoryThumbnail = memo(function HistoryThumbnail({ entry, size = "md", onClick }) {
  return (
    <button
      type="button"
      className={cn(styles.root, styles[size])}
      onClick={() => onClick?.(entry)}
      title={entry.prompt}
    >
      <div className={styles.imgWrap}>
        <Image
          src={entry.thumbnail}
          alt={entry.prompt}
          fill
          sizes="(max-width: 768px) 60px, 80px"
          className={styles.img}
        />
        {entry.type === "video" && (
          <span className={styles.videoIcon} aria-label="Video">
            <Icon name="play" size={10} />
          </span>
        )}
      </div>
    </button>
  );
});

export default HistoryThumbnail;
