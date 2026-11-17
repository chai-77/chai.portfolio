import { skillGroups } from "../data/skills";
import Reveal from "../components/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section-wrap content-section">
      <Reveal><h2 className="section-heading">Technologies I work with<span>.</span></h2></Reveal>
      <div className="skills-board">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06}>
            <section className="skill-band">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
