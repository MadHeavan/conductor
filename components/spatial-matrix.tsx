"use client"

import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useSpring,
  type PanInfo,
} from "motion/react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { BusBackground } from "@/components/bus-background"
import { SeatMapPanel, CommsPanel } from "@/components/panels/boarding-panels"
import { LiveGpsPanel, HardwarePanel } from "@/components/panels/navigation-panels"
import { WalkInQrPanel, RevenuePanel } from "@/components/panels/revenue-panels"

const COLUMNS = ["Boarding", "Navigation", "Revenue"] as const

// grid[col][row]
const GRID = [
  [SeatMapPanel, CommsPanel],
  [LiveGpsPanel, HardwarePanel],
  [WalkInQrPanel, RevenuePanel],
]

const SWIPE_THRESHOLD = 60

export function SpatialMatrix() {
  const [col, setCol] = useState(1) // start centered on Navigation? -> start on Boarding (0)
  const [row, setRow] = useState(0)
  const [dir, setDir] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // initialize to Boarding column
  useEffect(() => setCol(0), [])

  const colMV = useSpring(0, { stiffness: 80, damping: 18 })
  const rowMV = useSpring(0, { stiffness: 80, damping: 18 })

  useEffect(() => {
    colMV.set(col)
  }, [col, colMV])
  useEffect(() => {
    rowMV.set(row)
  }, [row, rowMV])

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { offset } = info
    const horizontal = Math.abs(offset.x) > Math.abs(offset.y)

    if (horizontal && Math.abs(offset.x) > SWIPE_THRESHOLD) {
      // horizontal swipe only meaningful on the top row (categories)
      if (row !== 0) return
      if (offset.x < 0 && col < COLUMNS.length - 1) {
        setDir({ x: 1, y: 0 })
        setCol((c) => c + 1)
      } else if (offset.x > 0 && col > 0) {
        setDir({ x: -1, y: 0 })
        setCol((c) => c - 1)
      }
    } else if (!horizontal && Math.abs(offset.y) > SWIPE_THRESHOLD) {
      if (offset.y < 0 && row < 1) {
        setDir({ x: 0, y: 1 })
        setRow(1)
      } else if (offset.y > 0 && row > 0) {
        setDir({ x: 0, y: -1 })
        setRow(0)
      }
    }
  }

  const Panel = GRID[col][row]

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#0C0C0C]">
      <BusBackground col={colMV} row={rowMV} />

      <TopBar col={col} row={row} />

      {/* Swipe surface */}
      <motion.div
        className="relative z-10 flex-1 touch-none"
        drag
        dragSnapToOrigin
        dragElastic={0.18}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full flex-col px-5 pb-28 pt-2">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`${col}-${row}`}
              custom={dir}
              initial={{ opacity: 0, x: dir.x * 60, y: dir.y * 60 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: dir.x * -40, y: dir.y * -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <SwipeCompass
        col={col}
        row={row}
        canLeft={row === 0 && col > 0}
        canRight={row === 0 && col < COLUMNS.length - 1}
        canDown={row === 0}
        canUp={row === 1}
        onNav={(d) => {
          if (d === "left" && row === 0 && col > 0) {
            setDir({ x: -1, y: 0 })
            setCol((c) => c - 1)
          } else if (d === "right" && row === 0 && col < COLUMNS.length - 1) {
            setDir({ x: 1, y: 0 })
            setCol((c) => c + 1)
          } else if (d === "down" && row === 0) {
            setDir({ x: 0, y: 1 })
            setRow(1)
          } else if (d === "up" && row === 1) {
            setDir({ x: 0, y: -1 })
            setRow(0)
          }
        }}
      />
    </div>
  )
}

function TopBar({ col, row }: { col: number; row: number }) {
  return (
    <div className="relative z-10 flex items-center justify-between px-5 pt-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">Route TN · KA-44</p>
        <p className="text-lg font-bold text-white">Conductor Deck</p>
      </div>
      {/* category dots */}
      <div className="flex items-center gap-1.5">
        {COLUMNS.map((c, i) => (
          <span
            key={c}
            className={`h-1.5 rounded-full transition-all ${
              i === col ? "w-6 bg-[#E9B872]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
        <span
          className={`ml-2 h-1.5 w-1.5 rounded-full transition-all ${
            row === 1 ? "bg-[#E9B872]" : "bg-white/20"
          }`}
        />
      </div>
    </div>
  )
}

function SwipeCompass({
  col,
  row,
  canLeft,
  canRight,
  canUp,
  canDown,
  onNav,
}: {
  col: number
  row: number
  canLeft: boolean
  canRight: boolean
  canUp: boolean
  canDown: boolean
  onNav: (d: "left" | "right" | "up" | "down") => void
}) {
  const labels = ["Boarding", "Navigation", "Revenue"]
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-6">
      <div className="pointer-events-auto mb-3 rounded-full border border-white/[0.06] bg-[#111111]/80 px-4 py-2 backdrop-blur-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E9B872]">
          {row === 1 ? "Deep Dive" : labels[col]}
        </span>
      </div>

      {/* cross-shaped indicator */}
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1">
        <span />
        <CompassBtn dir="up" active={canUp} onClick={() => onNav("up")}>
          <ChevronUp className="h-4 w-4" />
        </CompassBtn>
        <span />

        <CompassBtn dir="left" active={canLeft} onClick={() => onNav("left")}>
          <ChevronLeft className="h-4 w-4" />
        </CompassBtn>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9B872]/30 bg-[#E9B872]/10">
          <span className="h-2 w-2 rounded-full bg-[#E9B872]" />
        </div>
        <CompassBtn dir="right" active={canRight} onClick={() => onNav("right")}>
          <ChevronRight className="h-4 w-4" />
        </CompassBtn>

        <span />
        <CompassBtn dir="down" active={canDown} onClick={() => onNav("down")}>
          <ChevronDown className="h-4 w-4" />
        </CompassBtn>
        <span />
      </div>
    </div>
  )
}

function CompassBtn({
  active,
  onClick,
  children,
}: {
  dir: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={!active}
      aria-hidden={!active}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90 ${
        active
          ? "border-white/15 bg-[#111111]/80 text-[#E9B872] backdrop-blur-xl"
          : "border-white/[0.04] bg-transparent text-white/15"
      }`}
    >
      {children}
    </button>
  )
}
