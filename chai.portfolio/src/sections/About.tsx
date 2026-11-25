import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from '../data/profile';
import Reveal from "../components/Reveal";

const facts = [
  `B.Tech ${profile.year} ${profile.education}`,
  profile.specialization,
];

export default function About() {
  return (
    <section id="about" className="section-wrap content-section about-section grid-surface">
      <div className="about-grid">
        <Reveal className="about-intro">
          <p className="about-copy">{profile.about}</p>
        </Reveal>
        <Reveal delay={0.1} className="about-detail">
          <ul className="about-facts">
            {facts.map(fact => <li key={fact}>{fact}</li>)}
          </ul>
          <div className="about-actions">
            <a className="button button-dark" href="#work">See my work <ArrowDownRight size={16} /></a>
            <a className="button button-quiet" href={profile.resume}>Resume <ArrowUpRight size={15} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
