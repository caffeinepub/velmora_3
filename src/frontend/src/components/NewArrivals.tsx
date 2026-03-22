import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import ProductCard from "./ProductCard";

interface NewArrivalsProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

export default function NewArrivals({
  products,
  isLoading,
  onAddToCart,
}: NewArrivalsProps) {
  const displayProducts = products.slice(0, 8);

  return (
    <section
      id="new-arrivals"
      className="py-20 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto"
    >
      {/* Section header — left-aligned editorial, no centered divider formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold/50" />
            <span className="text-[9px] tracking-[0.5em] text-gold/70 uppercase">
              Curated For You
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] tracking-tight uppercase leading-none">
            New Arrivals
          </h2>
        </div>
        {/* Decorative season stamp */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <span className="font-display text-[4rem] leading-none text-foreground/[0.04] select-none">
            SS26
          </span>
        </div>
      </motion.div>

      {/* Product grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          data-ocid="products.loading_state"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <div key={i} className="space-y-3">
              <Skeleton
                className="w-full bg-card"
                style={{ aspectRatio: "2/3" }}
              />
              <Skeleton className="h-3 w-3/4 bg-card" />
              <Skeleton className="h-3 w-1/3 bg-card" />
            </div>
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="products.empty_state"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase">
            Loading collection…
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          data-ocid="products.list"
        >
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-6 mt-14"
      >
        <div className="h-px w-16 bg-border" />
        <button
          type="button"
          className="text-[11px] tracking-[0.3em] text-foreground/50 hover:text-gold border border-border hover:border-gold px-10 py-4 transition-all duration-300 uppercase font-medium"
          data-ocid="products.view_all.button"
        >
          View All Pieces
        </button>
        <div className="h-px w-16 bg-border" />
      </motion.div>
    </section>
  );
}
