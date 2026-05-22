import styles from "./ResultSkeleton.module.css";

export default function ResultSkeleton() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.shimmer} />
    </div>
  );
}
