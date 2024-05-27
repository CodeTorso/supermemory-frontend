"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { AddSvg } from "./svgFolder";
import { useState } from "react";
import { motion } from "framer-motion";

export function AddContent() {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="fixed left-1/2 top-6 -translate-x-1/2 rounded-3xl bg-[#1F2428] p-4"
      >
        <AddSvg />
      </motion.div>
      <ToolBar />
    </AnimatePresence>
  );
}

const fakeitems = ["spaces", "page", "note"];

function ToolBar() {
  const [index, setIndex] = useState(0);
  return (
    <div className="fixed top-32 z-[100000]">
      {/* <div className="bg-[#1F2428]">  */}
        <HoverEffect
          items={fakeitems}
          index={index}
          indexFn={(i) => setIndex(i)}
        />
        
      {/* </div> */}
    </div>
  );
}

export const HoverEffect = ({
  items,
  index,
  indexFn,
}: {
  items: string[];
  index: number;
  indexFn: (i: number) => void;
}) => {
  return (
    <div className={"grid grid-cols-1 py-10 md:grid-cols-2  lg:grid-cols-3"}>
      {items.map((item, idx) => (
        <button
          key={idx}
          className="relative block h-full w-full p-2"
          onClick={() => indexFn(idx)}
        >
          <AnimatePresence>
            {index === idx && (
              <motion.span
                className="absolute inset-0 -z-10 block h-full w-full rounded-3xl bg-[#2B3237]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <h3 className="text-[#858B92]">{item}</h3>
        </button>
      ))}
    </div>
  );
};
