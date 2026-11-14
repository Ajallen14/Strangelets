import * as React from "react";
import { motion } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TimelineMarker({ children }) {
  if (children) {
    return (
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6061B6]/50 bg-black text-[#C9B5E0] transition-all duration-300 group-hover:scale-110 group-hover:border-[#C9B5E0] group-hover:shadow-[0_0_15px_rgba(201,181,224,0.5)] [&_svg]:h-4 [&_svg]:w-4">
        {children}
      </div>
    );
  }
  return (
    <div className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-[#6061B6] ring-4 ring-black transition-all duration-300 group-hover:scale-125 group-hover:bg-[#C9B5E0] group-hover:shadow-[0_0_15px_rgba(201,181,224,0.6)]" />
  );
}

function TimelineItem({
  label,
  marker,
  className,
  children,
  orientation = "horizontal",
  align = "left",
  index = 0,
  isFirst = false,
  isLast = false,
  delay,
}) {
  const showAbove = index % 2 === 0;
  const revealDelay = delay ?? index * 0.12;

  const content = (
    <>
      {/* ── Mobile: vertical left-aligned ── */}
      <div className="flex flex-row items-stretch md:hidden">
        <div className="flex flex-col items-center mr-5 shrink-0">
          <TimelineMarker>{marker}</TimelineMarker>
          <div className={cn("w-px flex-1 bg-[#6061B6]/30 mt-1", isLast && "opacity-0")} />
        </div>
        <div className={cn("flex flex-col gap-2", isLast ? "pb-0" : "pb-10")}>
          {label && <div className="text-sm font-bold leading-snug text-[#FCF9EC] group-hover:text-[#C9B5E0] transition-colors">{label}</div>}
          {children && <div className="text-sm text-[#C9B5E0]/80 leading-relaxed">{children}</div>}
        </div>
      </div>

      {/* ── Desktop: horizontal with alternating up/down ── */}
      <div className="hidden md:flex flex-col items-center">
        <div className={cn("min-h-[3rem] flex items-end pb-2 w-full transition-all duration-300", showAbove ? "opacity-100 group-hover:-translate-y-1" : "opacity-0")}>
          {showAbove && label && (
            <div className="text-xs lg:text-sm font-bold text-center leading-snug text-[#FCF9EC] group-hover:text-[#C9B5E0] transition-colors px-3 break-words w-full">{label}</div>
          )}
        </div>

        <div className="flex items-center w-full">
          <div className={cn("h-px flex-1 bg-[#6061B6]/30 transition-colors duration-300 group-hover:bg-[#C9B5E0]/60", isFirst && "opacity-0")} />
          <TimelineMarker>{marker}</TimelineMarker>
          <div className={cn("h-px flex-1 bg-[#6061B6]/30 transition-colors duration-300 group-hover:bg-[#C9B5E0]/60", isLast && "opacity-0")} />
        </div>

        <div className={cn("min-h-[3rem] flex items-start pt-2 w-full transition-all duration-300", !showAbove ? "opacity-100 group-hover:translate-y-1" : "opacity-0")}>
          {!showAbove && label && (
            <div className="text-xs lg:text-sm font-bold text-center leading-snug text-[#FCF9EC] group-hover:text-[#C9B5E0] transition-colors px-3 break-words w-full">{label}</div>
          )}
        </div>

        {children && (
          <div className="text-sm text-[#C9B5E0]/80 text-center leading-relaxed max-w-[90%] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {children}
          </div>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      className={cn("group flex-1 min-w-0 cursor-pointer", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: revealDelay, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

export function Timeline({ orientation = "horizontal", align = "left", className, children }) {
  const items = React.Children.toArray(children);
  const count = items.length;

  return (
    <div className={cn("w-full", orientation === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col", className)}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          key: index,
          orientation,
          align,
          index,
          isFirst: index === 0,
          isLast: index === count - 1,
        });
      })}
    </div>
  );
}

Timeline.Item = TimelineItem;
export default Timeline;