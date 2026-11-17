import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";

export default function IntroOverlay() {
  const [visible, setVisible] = useState(() => !window.sessionStorage.getItem("portfolio-intro-seen"));
  const [typedName, setTypedName] = useState(() => (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? profile.name + ".": ""
  ));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;

    window.sessionStorage.setItem("portfolio-intro-seen", "true");
    if (reducedMotion) {
      const timeout = window.setTimeout(() => setVisible(false), 120);
      return () => window.clearTimeout(timeout);
    }

    let letter = 0;
    const typeInterval = window.setInterval(() => {
      letter += 1;
      setTypedName(profile.name.slice(0, letter));
      if (letter >= profile.name.length) window.clearInterval(typeInterval);
    }, 100);
    const closeTimeout = window.setTimeout(() => setVisible(false), 760);

    return () => {
      window.clearInterval(typeInterval);
      window.clearTimeout(closeTimeout);
    };
  }, [reducedMotion, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reducedMotion ? 0.15 : 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="intro-mark"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span>
                {typedName}
                <i className="typing-cursor" />
              </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
