import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const activeProject = projects[activeIndex];

  const renderDetails = (index: number) => {
    const project = projects[index];
    return (
      <>
        <p>{project.description}</p>
        <ul className="project-tags">
          {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
        </ul>
        {project.github && project.github !== "#" && (
          <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </>
    );
  };

  return (
    <section id="work" className="section-wrap content-section work-section">
      <Reveal><h2 className="section-heading">Selected work<span>.</span></h2></Reveal>
      <div className="featured-project" aria-live="polite">
        <article className="featured-project-content" key={activeProject.title}>
          <h3>{activeProject.title}</h3>
          <div className="featured-project-details">
            {renderDetails(activeIndex)}
          </div>
        </article>
      </div>
      <div className="projects-list" aria-label="Projects">
        {projects.map((project, index) => (
          <div className={`project-row${activeIndex === index ? " is-active" : ""}`} key={project.title}>
            <button
              className="project-select"
              type="button"
              aria-pressed={activeIndex === index}
              aria-expanded={expandedIndex === index}
              aria-controls={`project-inline-${index}`}
              onClick={() => {
                setActiveIndex(index);
                setExpandedIndex(current => current === index ? null : index);
              }}
            >
              <span className="project-dot" aria-hidden="true" />
              <span className="project-title">{project.title}</span>
            </button>
            <div
              className={`project-inline-details${expandedIndex === index ? " is-expanded" : ""}`}
              id={`project-inline-${index}`}
            >
              {renderDetails(index)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
