import CoffeeCup from "../components/CoffeeCup";
import Reveal from "../components/Reveal";

export default function Hero() {
  return (
    <section id="home" className="hero section-wrap">
      <Reveal delay={0.12} className="hero-art-wrap">
        <div className="hero-art">
          <CoffeeCup />
        </div>
      </Reveal>
    </section>
  );
}
