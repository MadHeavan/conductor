"use client"

import { motion, type MotionValue, useTransform } from "motion/react"

export function BusBackground({
  col,
  row,
}: {
  // col: 0..2 (horizontal category) -> rotate bus on Y axis
  // row: 0..1 (vertical deep dive)  -> rotate bus on X axis
  col: MotionValue<number>
  row: MotionValue<number>
}) {
  // Map column position to a Y rotation (side profiles)
  const rotateY = useTransform(col, [0, 1, 2], [-32, 0, 32])
  // Map row position to an X rotation (top-down / bottom-up POV)
  const rotateX = useTransform(row, [0, 1], [0, 46])
  const scale = useTransform(row, [0, 1], [1, 0.86])
  // Glow hue shifts subtly per category
  const glowOpacity = useTransform(col, [0, 1, 2], [0.5, 0.7, 0.5])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      {/* Ambient gold glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute h-[420px] w-[420px] rounded-full bg-[#E9B872]/20 blur-[120px]"
      />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0C0C0C_72%)]" />

      {/* 3D stage */}
      <motion.div
        className="relative"
        style={{
          perspective: 1100,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img
          src="/bus-3d.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ rotateY, rotateX, scale }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="w-[340px] max-w-[80vw] select-none opacity-[0.55] drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
        />
        {/* Reflection floor */}
        <motion.img
          src="/bus-3d.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ rotateY, scale }}
          className="absolute left-0 top-full w-[340px] max-w-[80vw] -scale-y-100 select-none opacity-[0.08] blur-sm [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
        />
      </motion.div>
    </div>
  )
}
