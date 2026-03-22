import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-fashion.dim_1920x1080.jpg')",
        }}
      />
      {/* Layered cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />

      {/* Content — left-anchored for editorial asymmetry */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <div className="w-8 h-px bg-gold/60" />
          <span className="text-[10px] md:text-[11px] tracking-[0.45em] text-gold font-medium uppercase">
            New Season · SS26
          </span>
        </motion.div>

        {/* Headline — dramatic two-tier scale */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-tight text-foreground/80 uppercase block"
          >
            Wear Your
          </motion.p>
        </div>
        <div className="overflow-hidden -mt-1 md:-mt-3">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(5rem,16vw,13rem)] leading-[0.85] tracking-[-0.02em] uppercase block text-gradient-gold italic"
          >
            Truth
          </motion.p>
        </div>

        {/* Bottom row: subhead + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="flex flex-col sm:flex-row sm:items-end gap-8 mt-10 md:mt-14"
        >
          <p className="text-[11px] md:text-xs tracking-[0.32em] text-foreground/45 uppercase max-w-[220px] leading-6">
            No Rules. No Limits.
            <br />
            Just You.
          </p>
          <motion.a
            href="#new-arrivals"
            whileHover={{ backgroundColor: "oklch(0.79 0.12 76)", y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="inline-block bg-gold text-black text-[11px] tracking-[0.3em] font-semibold px-10 py-[14px] uppercase"
            data-ocid="hero.primary_button"
          >
            Shop The Collection
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator — right-aligned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-px h-14 bg-gradient-to-b from-gold/50 to-transparent origin-top"
        />
        <span className="text-vertical text-[9px] tracking-[0.35em] text-foreground/30 uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
