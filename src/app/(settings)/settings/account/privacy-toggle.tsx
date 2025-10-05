"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function PrivacyToggle() {
  const [enabled, setEnabled] = useState<boolean>(false);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tchat-privacy");
      const isOn = stored === "on";
      setEnabled(isOn);
      document.documentElement.classList.toggle("privacy-on", isOn);
    } catch {
      // ignore
    }
  }, []);

  // when toggled, persist and set class on <html>
  const onChange = (next: boolean) => {
    setEnabled(next);
    try {
      localStorage.setItem("tchat-privacy", next ? "on" : "off");
    } catch {
      // ignore
    }
    document.documentElement.classList.toggle("privacy-on", next);
  };

  return (
    <div className="flex items-center gap-3">
      <Switch checked={enabled} onCheckedChange={onChange} />
      <span className="text-sm text-muted-foreground">
        {enabled ? "On" : "Off"}
      </span>
    </div>
  );
}
