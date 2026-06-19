"use client"

import { useState } from "react"
import { Navigation, Bluetooth, Volume2, Satellite } from "lucide-react"
import { PanelHeader, SectionLabel, StatusBadge, SurfaceCard } from "@/components/primitives"
import { routeStops } from "@/lib/bus-data"

export function LiveGpsPanel() {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Navigation · Live GPS" title="Route Tracking" />

      <div className="mb-4 flex items-center gap-2">
        <StatusBadge label="GPS Locked" tone="success" showPulse />
        <StatusBadge label="INSAT Fallback" tone="cool" />
      </div>

      <SurfaceCard variant="glass" className="relative mb-4 h-44 p-0">
        {/* stylized dark map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1a1a1a,#0c0c0c)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* route line */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 176" fill="none" preserveAspectRatio="none">
          <path
            d="M30 150 C 90 120, 70 70, 150 80 S 240 40, 270 26"
            stroke="#E9B872"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 10"
            opacity="0.7"
          />
        </svg>
        {/* pulsing current location */}
        <div className="absolute left-[44%] top-[44%]">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E9B872] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#0C0C0C] bg-[#E9B872]" />
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md">
          <Navigation className="h-3.5 w-3.5 text-[#E9B872]" />
          <span className="text-xs font-medium text-white">62 km/h · NH-44</span>
        </div>
      </SurfaceCard>

      <SectionLabel className="mb-3 block">Itinerary</SectionLabel>
      <div className="flex-1 overflow-y-auto pr-1">
        {routeStops.map((stop, i) => {
          const isCurrent = stop.status === "current"
          const isPassed = stop.status === "passed"
          return (
            <div key={stop.name} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 h-3 w-3 rounded-full border-2 ${
                    isCurrent
                      ? "border-[#E9B872] bg-[#E9B872]"
                      : isPassed
                        ? "border-white/30 bg-white/30"
                        : "border-white/20 bg-transparent"
                  }`}
                />
                {i < routeStops.length - 1 && <span className="h-7 w-px bg-white/10" />}
              </div>
              <div className="flex flex-1 items-center justify-between pb-2">
                <span className={`text-sm font-medium ${isCurrent ? "text-[#E9B872]" : "text-white"}`}>
                  {stop.name}
                </span>
                <span className="text-xs text-gray-500">{stop.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HardwarePanel() {
  const [paired, setPaired] = useState(true)
  return (
    <div className="flex h-full flex-col">
      <PanelHeader eyebrow="Navigation · Hardware" title="Hardware Connect" />

      <SurfaceCard variant="glass" className="mb-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                paired ? "border-[#E9B872]/40 bg-[#E9B872]/10 text-[#E9B872]" : "border-white/10 bg-white/[0.04] text-gray-500"
              }`}
            >
              <Bluetooth className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-white">Bus Speaker System</p>
              <p className="text-xs text-gray-400">BT-AUDIO · KA-09-7741</p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={paired}
            onClick={() => setPaired((p) => !p)}
            className={`relative h-8 w-14 rounded-full transition-colors ${paired ? "bg-[#E9B872]" : "bg-white/15"}`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-[#0C0C0C] transition-all ${paired ? "left-7" : "left-1"}`}
            />
          </button>
        </div>

        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <StatusBadge
            label={paired ? "Connected · Strong Signal" : "Disconnected"}
            tone={paired ? "success" : "danger"}
            showPulse={paired}
          />
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-2 gap-3">
        <SurfaceCard className="flex flex-col items-center justify-center gap-2 p-5">
          <Volume2 className="h-6 w-6 text-[#E9B872]" />
          <span className="text-2xl font-bold text-white">72%</span>
          <SectionLabel>Volume</SectionLabel>
        </SurfaceCard>
        <SurfaceCard className="flex flex-col items-center justify-center gap-2 p-5">
          <Satellite className="h-6 w-6 text-[#E9B872]" />
          <span className="text-2xl font-bold text-white">4 Zones</span>
          <SectionLabel>Cabin Audio</SectionLabel>
        </SurfaceCard>
      </div>
    </div>
  )
}
