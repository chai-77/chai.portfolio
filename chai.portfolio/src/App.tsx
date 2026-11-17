import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IntroOverlay from "./components/IntroOverlay";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import CampusInvolvement from "./sections/CampusInvolvement";
import Contact from "./sections/Contact";
import { profile } from "./data/profile";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#201a23" : "#f7f2eb",
    );
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <IntroOverlay />
      <Navbar theme={theme} onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CampusInvolvement />
        <Experience />
        <Contact />
      </main>
<footer className="site-footer">
  <div className="footer-inner">
    <span>© {new Date().getFullYear()} {profile.name}</span>
    <nav className="footer-links" aria-label="Social links">
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn <span aria-hidden="true">↗</span>
      </a>
    </nav>
  </div>
</footer>
    </>
  );
}
