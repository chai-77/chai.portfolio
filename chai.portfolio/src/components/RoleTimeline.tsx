import type { ExperienceItem } from "../data/experience";
import Reveal from "./Reveal";

export default function RoleTimeline({ items, emptyMessage }: {
  items: ExperienceItem[];
  emptyMessage?: string;
}) {
  if (!items.length) {
    return <p className="experience-empty">{emptyMessage}</p>;
  }

  return (
    <div className="timeline">
      {items.map((item, index) => (
        <Reveal key={`${item.title}-${item.organization}-${index}`}>
          <article className={`timeline-item${/current|present|ongoing/i.test(item.date) ? " is-current" : ""}`}>
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p className="timeline-org">{item.organization}</p>
              <p className="timeline-description">{item.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
