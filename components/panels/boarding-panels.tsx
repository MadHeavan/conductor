"use client"

import { Phone, Armchair, Clock } from "lucide-react"
import { PanelHeader, PrimaryButton, SectionLabel, StatusBadge, SurfaceCard } from "@/components/primitives"
import { seatRows, upcomingPassengers } from "@/lib/bus-data"

export function SeatMapPanel() {
  const available = seatRows.flat().filter((s) => s.status === "available").length
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Boarding · Seat Map" title="Theater Layout" />

      <div className="mb-4 flex items-center gap-2">
        <StatusBadge label={`${available} Open`} tone="accent" showPulse />
        <StatusBadge label={`${seatRows.flat().length - available} Booked`} tone="neutral" />
      </div>

      <SurfaceCard variant="glass" className="flex-1 p-5">
        <div className="mb-4 flex items-center justify-between">
          <SectionLabel>Deck · Lower</SectionLabel>
          <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400">
            Front
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {seatRows.map((row, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="w-4 text-[10px] text-gray-500">{i + 1}</span>
              <div className="flex flex-1 items-center justify-center gap-2.5">
                {row.slice(0, 2).map((seat) => (
                  <SeatCell key={seat.id} id={seat.id} status={seat.status} />
                ))}
                <span className="w-5" aria-hidden />
                {row.slice(2).map((seat) => (
                  <SeatCell key={seat.id} id={seat.id} status={seat.status} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-5 border-t border-white/[0.06] pt-4">
          <Legend className="border-[#E9B872] bg-[#E9B872]/10" label="Available" />
          <Legend className="border-white/10 bg-white/[0.04]" label="Booked" />
        </div>
      </SurfaceCard>
    </div>
  )
}

function SeatCell({ id, status }: { id: string; status: string }) {
  const booked = status === "booked"
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-xl border text-[11px] font-semibold transition-colors ${
        booked
          ? "border-white/10 bg-white/[0.04] text-gray-500"
          : "border-[#E9B872] bg-[#E9B872]/10 text-[#E9B872]"
      }`}
    >
      <Armchair className="h-4 w-4" />
    </div>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded-md border ${className}`} />
      <span className="text-[11px] uppercase tracking-wider text-gray-400">{label}</span>
    </div>
  )
}

export function CommsPanel() {
  const next = upcomingPassengers[0]
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Boarding · Comms" title="Call Passengers" />

      <SurfaceCard variant="glass" className="mb-4 p-5">
        <SectionLabel>Boarding Next · {next.stop}</SectionLabel>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">{next.name}</p>
            <p className="text-sm text-gray-400">
              Seat {next.seat} · arrives in {next.eta}
            </p>
          </div>
          <StatusBadge label={next.eta} tone="warning" showPulse />
        </div>
        <PrimaryButton className="mt-5 flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          Call Passenger
        </PrimaryButton>
      </SurfaceCard>

      <SectionLabel className="mb-3 block">Upcoming Queue</SectionLabel>
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
        {upcomingPassengers.slice(1).map((p) => (
          <SurfaceCard key={p.seat} className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{p.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="h-3 w-3" /> {p.eta} · Seat {p.seat}
              </p>
            </div>
            <button
              aria-label={`Call ${p.name}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E9B872]/40 bg-[#E9B872]/10 text-[#E9B872] transition-all active:scale-90"
            >
              <Phone className="h-4 w-4" />
            </button>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}
