import { experience } from "../data/experience";
import Reveal from "../components/Reveal";
import RoleTimeline from "../components/RoleTimeline";

export default function Experience() {
  return (
    <section id="experience" className="section-wrap content-section">
      <Reveal><h2 className="section-heading">Experience<span>.</span></h2></Reveal>
      <RoleTimeline
        items={experience}
        emptyMessage="Learning through projects for now."
      />
    </section>
  );
}
