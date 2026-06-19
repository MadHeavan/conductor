"use client"

import { useMemo } from "react"
import { IndianRupee, Ticket, Smartphone, Wallet, TrendingUp } from "lucide-react"
import { PanelHeader, SectionLabel, StatusBadge, SurfaceCard } from "@/components/primitives"
import { revenueSummary } from "@/lib/bus-data"

function QrGraphic() {
  // Deterministic pseudo-random module pattern (21x21 like a v1 QR)
  const cells = useMemo(() => {
    const size = 21
    const out: boolean[] = []
    let seed = 7
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      out.push((seed >> 16) % 2 === 0)
    }
    return out
  }, [])

  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, 14) || inBox(14, 0)
  }

  return (
    <div className="grid aspect-square w-full grid-cols-21 gap-0 rounded-2xl bg-white p-4" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
      {cells.map((on, idx) => {
        const r = Math.floor(idx / 21)
        const c = idx % 21
        const finder = isFinder(r, c)
        const dark = finder ? true : on
        return <span key={idx} className={dark ? "bg-[#0C0C0C]" : "bg-white"} aria-hidden />
      })}
    </div>
  )
}

export function WalkInQrPanel() {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Revenue · Walk-In" title="Scan & Pay" />

      <div className="mb-4 flex items-center gap-2">
        <StatusBadge label="UPI Live" tone="success" showPulse />
        <StatusBadge label="GPay · PhonePe" tone="accent" />
      </div>

      <SurfaceCard variant="glass" className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-[260px]">
          <QrGraphic />
        </div>
        <p className="mt-5 text-center text-sm text-gray-400">Scan to pay fare instantly</p>
        <p className="text-center font-mono text-base font-semibold tracking-wide text-white">
          conductor@vbus.upi
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2">
          <IndianRupee className="h-4 w-4 text-[#E9B872]" />
          <span className="text-sm text-gray-300">Enter fare on UPI app</span>
        </div>
      </SurfaceCard>
    </div>
  )
}

export function RevenuePanel() {
  const r = revenueSummary
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Revenue · Shift Summary" title="Today's Collection" />

      <SurfaceCard variant="glass" className="mb-3 p-6">
        <SectionLabel>Total Amount Collected</SectionLabel>
        <div className="mt-1 flex items-center gap-1">
          <IndianRupee className="h-8 w-8 text-[#E9B872]" />
          <span className="text-5xl font-extrabold tracking-tight text-white">
            {r.totalCollected.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span className="text-xs text-gray-400">Shift since {r.shiftStart} · avg ₹{r.averageFare}/ticket</span>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-2 gap-3">
        <Stat icon={<Ticket className="h-5 w-5" />} value={r.walkInTickets} label="Walk-In Tickets" />
        <Stat icon={<Smartphone className="h-5 w-5" />} value={r.digitalPayments} label="Digital Pays" />
        <Stat icon={<Wallet className="h-5 w-5" />} value={r.cashPayments} label="Cash Pays" />
        <Stat
          icon={<IndianRupee className="h-5 w-5" />}
          value={r.averageFare}
          label="Avg Fare"
          prefix="₹"
        />
      </div>
    </div>
  )
}

function Stat({
  icon,
  value,
  label,
  prefix = "",
}: {
  icon: React.ReactNode
  value: number
  label: string
  prefix?: string
}) {
  return (
    <SurfaceCard className="p-5">
      <span className="text-[#E9B872]">{icon}</span>
      <p className="mt-3 text-3xl font-bold text-white">
        {prefix}
        {value}
      </p>
      <SectionLabel className="mt-1 block">{label}</SectionLabel>
    </SurfaceCard>
  )
}
