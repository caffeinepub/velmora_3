import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type { Product } from "../backend.d";
import { formatPrice, getProductImage } from "./ProductCard";

interface CuratedStripProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function CuratedStrip({
  products,
  onAddToCart,
}: CuratedStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.slice(0, 6);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  if (displayProducts.length === 0) return null;

  return (
    <section
      className="py-14 md:py-20 bg-[oklch(0.10_0.003_260)] border-t border-border overflow-hidden"
      aria-label="Curated Edit"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gold mb-1 uppercase">
              Editor&apos;s Pick
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase">
              Curated Edit: Streetwear Finesse
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-9 h-9 border border-border rounded-sm flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll left"
              data-ocid="curated.pagination_prev"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-9 h-9 border border-border rounded-sm flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll right"
              data-ocid="curated.pagination_next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties
          }
        >
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id.toString()}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-none w-48 md:w-56 snap-start group cursor-pointer"
              data-ocid={`curated.item.${i + 1}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm mb-3">
                <img
                  src={getProductImage(product, i)}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="text-[10px] tracking-[0.2em] font-semibold bg-gold text-black px-4 py-2 rounded-sm hover:bg-gold-bright transition-colors"
                    data-ocid={`curated.add_button.${i + 1}`}
                  >
                    ADD
                  </button>
                </div>
              </div>
              <p className="text-[11px] tracking-widest text-foreground uppercase truncate">
                {product.name}
              </p>
              <p className="text-[11px] tracking-wider text-muted-foreground mt-0.5">
                {formatPrice(product.price)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
