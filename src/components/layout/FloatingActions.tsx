"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showPopupPulse, setShowPopupPulse] = useState(false);
  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent("Hello Baby Mart, I need help choosing a baby product.");
    return `https://wa.me/8801700000000?text=${message}`;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setShowTop(current > 520);
      setScrollProgress(Math.round((current / max) * 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowHint(true);
      window.setTimeout(() => setShowHint(false), 2400);
    }, 6200);

    const initial = window.setTimeout(() => setShowHint(true), 1400);
    const initialHide = window.setTimeout(() => setShowHint(false), 3600);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(initial);
      window.clearTimeout(initialHide);
    };
  }, []);

  useEffect(() => {
    const start = window.setTimeout(() => setShowPopupPulse(true), 1100);
    const stop = window.setTimeout(() => setShowPopupPulse(false), 2400);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, []);

  const ringStyle = {
    background: `conic-gradient(#f6d58b ${scrollProgress}%, rgba(255,255,255,0.25) ${scrollProgress}%)`
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-3">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          title="Chat with us"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0.97, y: 6, opacity: 0 }}
          animate={{
            y: [0, -4, 0],
            scale: [1, 1.03, 1],
            opacity: 1
          }}
          whileHover={{
            scale: 1.06,
            y: -6,
            boxShadow: "0_26px_58px_rgba(28,161,74,0.45)"
          }}
          whileTap={{ scale: 0.92 }}
          transition={{
            y: { repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 3.2, ease: "easeInOut" },
            scale: { repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 3.2, ease: "easeInOut" },
            opacity: { duration: 0.4, ease: "easeOut" }
          }}
          className="group relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#28c76f] to-[#1ca14a] text-white shadow-[0_16px_35px_rgba(28,161,74,0.35)] transition duration-300 hover:shadow-[0_22px_50px_rgba(28,161,74,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/24" />
          <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-[#25D366]/35" />
          <span className="pointer-events-none absolute -inset-2 rounded-full border border-[#7ef0a5]/40 animate-ping" />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-white/15 opacity-0 transition duration-300 group-hover:opacity-100" />
          <motion.span
            className="pointer-events-none absolute right-[calc(100%+0.7rem)] top-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-[linear-gradient(135deg,rgba(7,17,31,0.95),rgba(13,24,37,0.88))] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_18px_40px_rgba(7,17,31,0.26)] backdrop-blur-sm"
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{
              opacity: showHint ? 1 : 0,
              x: showHint ? 0 : 12,
              scale: showHint ? 1 : 0.9
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            Chat with us
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-xl bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.span>
          <motion.span
            className="relative grid h-14 w-14 place-items-center rounded-full transition duration-300 group-hover:scale-105"
            whileHover={{ rotate: [0, -9, 9, 0], transition: { duration: 0.45 } }}
            whileTap={{ rotate: 0, scale: 0.93 }}
          >
            <WhatsAppLogo className="h-7 w-7" />
          </motion.span>
          <AnimatePresence>
            {showPopupPulse && (
              <motion.span
                className="absolute -inset-8 rounded-full border border-[#8ff8a0]/35"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: [0.35, 0.7, 0],
                  scale: [0.75, 1.15, 1.45]
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 1.2, repeat: 1, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.a>

        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              title="Back to top"
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -3, boxShadow: "0_24px_56px_rgba(212,168,83,0.45)" }}
              whileTap={{ scale: 0.92, y: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-[#D4A853]/45 bg-[#07111F] p-[2px] text-[#07111F] shadow-[0_18px_45px_rgba(212,168,83,0.35)] transition duration-300 hover:shadow-[0_24px_56px_rgba(212,168,83,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
            >
              <span className="absolute inset-0 rounded-full animate-pulse bg-[#D4A853]/30 opacity-70" />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-[linear-gradient(135deg,#F6D58B,#D4A853)]" style={ringStyle}>
                <ArrowUp size={20} className="relative drop-shadow-[0_4px_8px_rgba(15,23,42,0.35)]" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.03 3.2A12.73 12.73 0 0 0 5.18 22.6L3.7 28.8l6.34-1.45A12.72 12.72 0 1 0 16.03 3.2Zm0 2.2a10.52 10.52 0 0 1 8.95 16.03 10.46 10.46 0 0 1-12.77 3.73l-.4-.18-3.73.85.87-3.6-.23-.42A10.52 10.52 0 0 1 16.03 5.4Zm-5.1 5.55c-.23 0-.6.09-.92.44-.31.35-1.2 1.18-1.2 2.87 0 1.7 1.24 3.34 1.41 3.57.18.23 2.4 3.82 5.9 5.2 2.9 1.14 3.5.91 4.13.86.63-.06 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4-.34-.17-2.03-1-2.35-1.12-.31-.11-.54-.17-.77.17-.23.34-.89 1.12-1.09 1.35-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.57-.58-.77-.59h-.67Z" />
    </svg>
  );
}
