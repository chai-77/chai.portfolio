import { CodeXml } from "lucide-react";
import {
  siC,
  siCplusplus,
  siCss,
  siDjango,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siPython,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { skillGroups } from "../data/skills";
import Reveal from "../components/Reveal";

const skillLogos: Record<string, SimpleIcon> = {
  c: siC,
  cpp: siCplusplus,
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  html: siHtml5,
  css: siCss,
  node: siNodedotjs,
  express: siExpress,
  django: siDjango,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  linux: siLinux,
  git: siGit,
  github: siGithub,
};

export default function Skills() {
  return (
    <section id="skills" className="section-wrap content-section">
      <Reveal><h2 className="section-heading">Skills<span>.</span></h2></Reveal>
      <div className="skills-board">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06}>
            <section className="skill-band">
              <h3>{group.title}</h3>
              <ul className="skill-items" aria-label={`${group.title} skills`} tabIndex={0}>
                {group.items.map(item => {
                  const icon = skillLogos[item.icon];

                  return (
                    <li className="skill-card" key={item.name}>
                      <span className="skill-card-logo" aria-hidden="true">
                        {icon ? (
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path d={icon.path} />
                          </svg>
                        ) : (
                          <CodeXml size={38} strokeWidth={1.6} />
                        )}
                      </span>
                      <span className="skill-card-name">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
