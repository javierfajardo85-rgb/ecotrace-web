"use client";

import Image from "next/image";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingMarketSphereProps = {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  imageClassName?: string;
};

export function FloatingMarketSphere({
  imageSrc,
  imageAlt,
  className,
  imageClassName,
}: FloatingMarketSphereProps) {
  const variants: Variants = {
    idle: {
      y: [0, -16, 0] as number[],
      transition: {
        duration: 6.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    hover: {
      y: -22,
      scale: 1.09,
      rotate: -1.5,
      transition: { type: "spring", stiffness: 320, damping: 12, mass: 0.6 },
    },
  };

  return (
    <motion.div
      className={cn("relative mx-auto aspect-square w-full max-w-[1080px]", className)}
      variants={variants}
      initial="idle"
      animate="idle"
      whileHover="hover"
    >
      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(27,191,60,0.30),transparent_62%)] blur-3xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        quality={100}
        sizes="(min-width: 768px) 1080px, 80vw"
        className={cn(
          "object-contain drop-shadow-[0_24px_70px_rgba(0,0,0,0.16)]",
          // A tiny boost helps equalize perceived sphere size across assets with extra padding.
          "scale-[1.04]",
          imageClassName,
        )}
        priority={false}
      />
    </motion.div>
  );
}

