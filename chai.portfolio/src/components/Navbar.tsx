import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/profile";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Campus", "#campus-involvement"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Navbar({
  theme,
  onThemeToggle,
}: {
  theme: "light" | "dark";
  onThemeToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#home">{profile.name}<span>.</span></a>
        <div className="desktop-nav">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === "light" ? "Night" : "Day"}</span>
        </button>
        <button
          className="mobile-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          {/* <button className="mobile-theme-toggle" type="button" onClick={onThemeToggle}>
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            Switch to {theme === "light" ? "night" : "day"} mode
          </button> */}
        </nav>
      )}
    </header>
  );
}
