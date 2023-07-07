import { useState } from "react";
import { useEffect } from "react";
import light from "../../assets/light.svg";
import dark from "../../assets/dark.svg";
import styles from "../Icons.module.css";
export const DarkMode = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.container} onClick={handleThemeChange}>
      <div className={styles.icon}>
        <img src={dark} />
      </div>
      <div className={styles.icon}>
        <img src={light} />
      </div>
      <div className={styles.ball} style={theme === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  );
};
