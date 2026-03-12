import { Info, AlertTriangle, Lightbulb, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/cn";

type CalloutType = "note" | "warning" | "tip" | "danger";

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const VARIANTS: Record<
  CalloutType,
  { icon: React.ReactNode; borderColor: string; bgColorClass: string; iconColor: string; label: string }
> = {
  note: {
    icon: <Info size={16} />,
    borderColor: "var(--color-primary)",
    bgColorClass: "bg-theme-primary/10",
    iconColor: "var(--color-primary)",
    label: "Note",
  },
  tip: {
    icon: <Lightbulb size={16} />,
    borderColor: "var(--color-success)",
    bgColorClass: "bg-theme-success/10",
    iconColor: "var(--color-success)",
    label: "Tip",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    borderColor: "var(--color-warning)",
    bgColorClass: "bg-theme-warning/10",
    iconColor: "var(--color-warning)",
    label: "Warning",
  },
  danger: {
    icon: <AlertOctagon size={16} />,
    borderColor: "var(--color-error)",
    bgColorClass: "bg-theme-error/10",
    iconColor: "var(--color-error)",
    label: "Danger",
  },
};

export function Callout({ type = "note", children }: CalloutProps) {
  const config = VARIANTS[type];

  return (
    <div
      role="note"
      className={cn(
        "relative z-10 rounded-xl px-4 py-3 my-5 border-l-4 shadow-neu-raised-sm bg-bg-sunken",
        config.bgColorClass
      )}
      style={{
        borderLeftColor: config.borderColor,
      }}
    >
      <div
        className="flex items-center gap-2 mb-1.5 text-sm font-semibold"
        style={{ color: config.iconColor }}
      >
        {config.icon}
        {config.label}
      </div>
      <div className="text-sm leading-relaxed text-content-primary">
        {children}
      </div>
    </div>
  );
}
