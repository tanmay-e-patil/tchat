"use client";

import { useEffect } from "react";

export function PrivacyHydrator() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tchat-privacy");
      const isOn = stored === "on";
      document.documentElement.classList.toggle("privacy-on", isOn);
    } catch {
      // noop
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "tchat-privacy") {
        const isOn = e.newValue === "on";
        document.documentElement.classList.toggle("privacy-on", isOn);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}
