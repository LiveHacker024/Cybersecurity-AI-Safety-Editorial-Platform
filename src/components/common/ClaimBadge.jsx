import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, HelpCircle } from 'lucide-react';

export default function ClaimBadge({ status = "CONFIRMED FACT", size = "normal" }) {
  const configs = {
    "CONFIRMED FACT": {
      label: "CONFIRMED FACT",
      icon: CheckCircle2,
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.35)",
      color: "#10b981",
      desc: "Independently verified via official vendor, CISA KEV, or primary documentation."
    },
    "REPORTED CLAIM": {
      label: "REPORTED CLAIM",
      icon: AlertTriangle,
      bg: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.35)",
      color: "#f59e0b",
      desc: "Reported by involved parties or third-party intelligence; awaiting primary verification."
    },
    "ANALYSIS": {
      label: "ANALYSIS",
      icon: Lightbulb,
      bg: "rgba(168, 85, 247, 0.12)",
      border: "rgba(168, 85, 247, 0.35)",
      color: "#c084fc",
      desc: "Technical evaluation, threat modeling, and expert deduction by security engineers."
    },
    "UNKNOWN / UNVERIFIED": {
      label: "UNKNOWN / UNVERIFIED",
      icon: HelpCircle,
      bg: "rgba(239, 68, 68, 0.12)",
      border: "rgba(239, 68, 68, 0.35)",
      color: "#f87171",
      desc: "Preliminary or developing incident; technical confirmation remains pending."
    }
  };

  const current = configs[status] || configs["ANALYSIS"];
  const IconComponent = current.icon;
  const isSmall = size === "small";

  return (
    <span
      title={current.desc}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '0.3rem' : '0.45rem',
        padding: isSmall ? '0.15rem 0.5rem' : '0.25rem 0.75rem',
        background: current.bg,
        border: `1px solid ${current.border}`,
        borderRadius: '6px',
        color: current.color,
        fontSize: isSmall ? '0.65rem' : '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase'
      }}
    >
      <IconComponent size={isSmall ? 11 : 14} />
      <span>{current.label}</span>
    </span>
  );
}
