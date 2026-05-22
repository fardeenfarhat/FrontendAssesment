"use client";

import { useState, useRef, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeProvider";
import { useGenerationState } from "@/context/GenerationProvider";
import Icon from "@/components/ui/Icon";
import styles from "./Header.module.css";

const TOOL_MODES = [
  { id: "home",    label: "Home",    icon: "home"    },
  { id: "gallery", label: "Gallery", icon: "image"   },
  { id: "video",   label: "Video",   icon: "video"   },
  { id: "audio",   label: "Audio",   icon: "mic-off", mobileHide: true },
  { id: "files",   label: "Files",   icon: "folder",  mobileHide: true },
];

export default function Header() {
  const [activeMode, setActiveMode] = useState("home");
  const [pillLeft, setPillLeft] = useState(null);
  const btnRefs = useRef([]);
  const navRef = useRef(null);
  const { theme, toggleTheme } = useThemeContext();
  const { status } = useGenerationState();
  const isGenerating = status === "loading";

  useEffect(() => {
    function updatePill() {
      const idx = TOOL_MODES.findIndex((m) => m.id === activeMode);
      let btn = btnRefs.current[idx];
      const nav = navRef.current;
      if (!nav) return;
      // If active button is hidden (display:none), fall back to first visible button
      if (!btn || btn.offsetParent === null) {
        btn = btnRefs.current.find((b) => b && b.offsetParent !== null);
        if (!btn) return;
      }
      const btnRect = btn.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setPillLeft(btnRect.left - navRect.left + btnRect.width / 2);
    }
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeMode]);

  return (
    <header className={styles.header}>
      <div className={styles.navRow}>

        {/* Left: logo */}
        <div className={styles.navLeft}>
          <div className={styles.logo} aria-label="AI Generator">
            <span className={styles.logoLetter}>F</span>
          </div>
        </div>

        {/* Center: mode icons + track + sliding pill */}
        <nav ref={navRef} className={styles.modeNav} aria-label="Navigation">
          {TOOL_MODES.map((mode, idx) => (
            <button
              key={mode.id}
              ref={(el) => { btnRefs.current[idx] = el; }}
              type="button"
              aria-label={mode.label}
              aria-pressed={activeMode === mode.id}
              className={`${styles.modeBtn}${activeMode === mode.id ? ` ${styles.modeBtnActive}` : ""}${mode.mobileHide ? ` ${styles.modeBtnMobileHide}` : ""}`}
              onClick={() => setActiveMode(mode.id)}
            >
              <Icon name={mode.icon} size={19} />
            </button>
          ))}

          {/* Sliding pill — rendered last so it sits above the track */}
          <span
            className={`${styles.activePill} ${isGenerating ? styles.pillGenerating : ""}`}
            style={{ left: pillLeft ?? 0, opacity: pillLeft === null ? 0 : 1 }}
            aria-hidden="true"
          />
        </nav>

        {/* Right: utility controls */}
        <div className={styles.navRight}>
          <button type="button" className={styles.navLink}>
            <Icon name="gallery" size={13} />
            <span>Gallery</span>
          </button>
          <button type="button" className={styles.navLink}>
            <Icon name="support" size={13} />
            <span>Support</span>
          </button>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>
          <div className={styles.avatar} aria-label="Account">
            <img
              src="https://picsum.photos/seed/avatar-fx/80/80"
              alt="Profile"
              className={styles.avatarImg}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
