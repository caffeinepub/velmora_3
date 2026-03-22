import { motion } from "motion/react";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: "oklch(0.11 0.004 255)" }}
      aria-labelledby="philosophy-heading"
    >
      {/* Vertical rotated eyebrow */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/30" />
        <span
          className="text-vertical text-[9px] tracking-[0.55em] text-gold/30 uppercase"
          aria-hidden="true"
        >
          Brand Philosophy — SS26
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold/30" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-[9fr_11fr] gap-16 md:gap-24 items-center">
          {/* Left — text column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-gold/50" />
              <span className="text-[9px] tracking-[0.5em] text-gold/70 uppercase font-medium">
                Our Philosophy
              </span>
            </div>

            <h2
              id="philosophy-heading"
              className="font-display text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.88] tracking-tight uppercase mb-10"
            >
              Dressed
              <br />
              <span className="text-gradient-gold italic">For The</span>
              <br />
              Moment
            </h2>

            <div className="space-y-5 mb-10">
              <p
                className="text-[14px] md:text-[15px] leading-[1.85] text-foreground/55"
                style={{ fontVariantNumeric: "oldstyle-nums" }}
              >
                Velmora was born from a refusal to choose between luxury and
                identity. We believe that fashion is not a uniform — it is a
                language. Every stitch, every silhouette, every fabric is a
                declaration of who you are and who you dare to become.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-foreground/40">
                Our collections merge architectural precision with raw,
                unfiltered expression — designed for those who move through the
                world with intention and leave a mark long after they&apos;ve
                left the room.
              </p>
            </div>

            <a
              href="#new-arrivals"
              className="group/link inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-gold uppercase font-medium"
              data-ocid="philosophy.shop.link"
            >
              <span className="relative">
                Discover The Collection
                <span className="absolute -bottom-px left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-500 ease-out" />
              </span>
              <span className="text-gold/50 transition-transform duration-300 group-hover/link:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative">
              <img
                src="/assets/generated/philosophy-fashion.dim_800x1000.jpg"
                alt="Velmora brand philosophy — luxury fashion editorial"
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5" }}
              />
              <div className="absolute top-5 left-5 w-10 h-10 border-l border-t border-gold/35 pointer-events-none" />
              <div className="absolute top-5 right-5 w-10 h-10 border-r border-t border-gold/35 pointer-events-none" />
              <div className="absolute bottom-5 left-5 w-10 h-10 border-l border-b border-gold/35 pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-r border-b border-gold/35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -bottom-5 -left-5 bg-background border border-border p-5 hidden md:block"
            >
              <p className="font-display text-2xl text-gold leading-none">14</p>
              <p className="text-[9px] tracking-[0.35em] text-foreground/40 uppercase mt-1">
                Seasons
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
