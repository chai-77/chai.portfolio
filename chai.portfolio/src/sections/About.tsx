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
        <Reveal>
          <h2 className="section-heading">Curious about<br />what’s <em>underneath.</em></h2>
        </Reveal>
        <Reveal delay={0.1} className="about-detail">
          <p className="about-copy">
            {profile.about}
          </p>
          <ul className="about-facts">
            {facts.map(fact => <li key={fact}>{fact}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
