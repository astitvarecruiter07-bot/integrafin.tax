import { ArrowRight, CheckCircle2, ClipboardList } from "lucide-react";
import styles from "./WorkflowPreview.module.css";

type WorkflowPreviewProps = {
  label: string;
  title: string;
  items: readonly string[];
  note?: string;
};

export default function WorkflowPreview({
  label,
  title,
  items,
  note = "The next step and written scope follow an initial review.",
}: WorkflowPreviewProps) {
  return (
    <div className={styles.stage} aria-label={`${title} overview`}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.icon} aria-hidden="true"><ClipboardList size={19} /></span>
          <div>
            <span className={styles.label}>{label}</span>
            <strong className={styles.title}>{title}</strong>
          </div>
          <CheckCircle2 className={styles.headerCheck} size={19} aria-hidden="true" />
        </div>
        <div className={styles.grid}>
          {items.slice(0, 3).map((item, index) => (
            <div className={styles.item} key={`${index}-${item}`}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <span>{note}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.floating} aria-hidden="true">
        <span className={styles.floatingMark}>✓</span>
        <span><small>HOW WE WORK</small><strong>Clear records. Clear next steps.</strong></span>
      </div>
    </div>
  );
}
