import type { ReactNode } from "react"

export const GOLD = "#E9B872"

type DivProps = {
  children: ReactNode
  className?: string
}

export function SurfaceCard({
  children,
  variant = "solid",
  className = "",
}: DivProps & { variant?: "solid" | "glass" }) {
  const base = "rounded-[28px] border border-white/[0.06] overflow-hidden"
  const variants = {
    solid: "bg-[#111111]",
    glass: "bg-[#111111]/80 backdrop-blur-xl shadow-2xl shadow-black/60",
  }
  return <div className={`${base} ${variants[variant]} ${className}`}>{children}</div>
}

export function SectionLabel({ children, className = "" }: DivProps) {
  return (
    <span
      className={`text-[11px] text-gray-400 uppercase tracking-[0.18em] font-semibold ${className}`}
    >
      {children}
    </span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
}: DivProps & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-8 py-4 bg-[#E9B872] text-[#0C0C0C] rounded-full font-bold uppercase tracking-[0.12em] text-sm transition-all hover:brightness-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
}: DivProps & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-8 py-3.5 bg-transparent border-2 border-[#E9B872] text-[#E9B872] rounded-full font-bold uppercase tracking-[0.12em] text-sm transition-all hover:bg-[#E9B872]/10 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

type Tone = "success" | "warning" | "danger" | "accent" | "cool" | "neutral"

export function StatusBadge({
  label,
  tone = "neutral",
  showPulse = false,
  className = "",
}: {
  label: string
  tone?: Tone
  showPulse?: boolean
  className?: string
}) {
  const tones: Record<Tone, { bg: string; text: string; dot: string }> = {
    success: { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
    warning: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
    danger: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
    accent: { bg: "bg-[#E9B872]/10", text: "text-[#E9B872]", dot: "bg-[#E9B872]" },
    cool: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
    neutral: { bg: "bg-white/10", text: "text-gray-300", dot: "bg-gray-300" },
  }
  const t = tones[tone]
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.04] ${t.bg} ${className}`}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${t.dot}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${t.dot}`} />
        </span>
      )}
      <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${t.text}`}>
        {label}
      </span>
    </div>
  )
}

export function PanelHeader({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-5">
      <h1 className="uppercase text-[#E9B872] text-xs tracking-[0.22em] font-bold">{eyebrow}</h1>
      <p className="text-white text-3xl font-bold mt-1 leading-tight tracking-tight text-balance">
        {title}
      </p>
    </div>
  )
}
