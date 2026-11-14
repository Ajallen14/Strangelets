import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  distance = 50,
  direction = "up",
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitial()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};