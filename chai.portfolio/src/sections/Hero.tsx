import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import CoffeeCup from "../components/CoffeeCup";
import { profile } from "../data/profile";
import Reveal from "../components/Reveal";

export default function Hero() {
  return (
    <section id="home" className="hero section-wrap">
      <div className="hero-copy">
        <Reveal>
          <h1>I like computers<br />at their <em>core.</em></h1>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">My work <ArrowDownRight size={16} /></a>
            <a className="button button-quiet" href={profile.resume}>Resume <ArrowUpRight size={15} /></a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.12} className="hero-art-wrap">
        <div className="hero-art">
          {/* <span className="hero-art-spark">✳</span> */}
          <CoffeeCup />
        </div>
      </Reveal>
    </section>
  );
}
