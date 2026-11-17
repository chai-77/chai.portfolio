import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "../components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-wrap contact-section">
      <Reveal>
        <h2>Have something<br /><em>interesting</em> in mind?</h2>
        <p className="contact-copy">Open to learning, collaboration and thoughtful technical projects.</p>
        <a className="contact-email" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email} <ArrowUpRight size={17} /></a>
      </Reveal>
    </section>
  );
}
