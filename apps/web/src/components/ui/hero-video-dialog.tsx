"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroVideoDialogProps {
  className?: string;
  animationStyle?: "from-bottom" | "from-center" | "from-top" | "fade";
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
}

export default function HeroVideoDialog({
  className,
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}: HeroVideoDialogProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <div className={cn("relative", className)}>
      {/* Thumbnail */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-xl bg-muted"
        onClick={openVideo}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary">
            <svg
              className="ml-1 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              initial={
                animationStyle === "from-bottom"
                  ? { y: 100, opacity: 0 }
                  : animationStyle === "from-top"
                  ? { y: -100, opacity: 0 }
                  : animationStyle === "from-center"
                  ? { scale: 0.8, opacity: 0 }
                  : { opacity: 0 }
              }
              animate={
                animationStyle === "from-bottom" || animationStyle === "from-top"
                  ? { y: 0, opacity: 1 }
                  : animationStyle === "from-center"
                  ? { scale: 1, opacity: 1 }
                  : { opacity: 1 }
              }
              exit={
                animationStyle === "from-bottom"
                  ? { y: 100, opacity: 0 }
                  : animationStyle === "from-top"
                  ? { y: -100, opacity: 0 }
                  : animationStyle === "from-center"
                  ? { scale: 0.8, opacity: 0 }
                  : { opacity: 0 }
              }
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                onClick={closeVideo}
                aria-label="Close video"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video iframe */}
              <iframe
                src={videoSrc}
                className="h-full w-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="Video player"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}