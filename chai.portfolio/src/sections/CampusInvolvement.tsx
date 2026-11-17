import { campusInvolvement } from "../data/experience";
import Reveal from "../components/Reveal";
import RoleTimeline from "../components/RoleTimeline";

export default function CampusInvolvement() {
  return (
    <section id="campus-involvement" className="section-wrap content-section campus-section grid-surface">
      <Reveal><h2 className="section-heading">Campus &amp; community<span>.</span></h2></Reveal>
      <RoleTimeline
        items={campusInvolvement}
        emptyMessage="Campus and community involvement will be added here."
      />
    </section>
  );
}
