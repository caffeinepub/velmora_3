import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Badge as BadgeEnum } from "../backend.d";
import type { Product } from "../backend.d";

const FALLBACK_IMAGES = [
  "/assets/generated/product-blazer.dim_600x600.jpg",
  "/assets/generated/product-dress.dim_600x600.jpg",
  "/assets/generated/product-trench.dim_600x600.jpg",
  "/assets/generated/product-sweater.dim_600x600.jpg",
  "/assets/generated/product-trousers.dim_600x600.jpg",
  "/assets/generated/product-bag.dim_600x600.jpg",
  "/assets/generated/product-tshirt.dim_600x600.jpg",
  "/assets/generated/product-boots.dim_600x600.jpg",
];

export function getProductImage(product: Product, index: number): string {
  if (product.imageUrl?.startsWith("http")) return product.imageUrl;
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export function formatPrice(price: bigint): string {
  const num = Number(price);
  return `$${num.toLocaleString()}`;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  index,
  onAddToCart,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = imgError
    ? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
    : getProductImage(product, index);

  const badgeLabel =
    product.badge === BadgeEnum.hot
      ? "HOT"
      : product.badge === BadgeEnum.new_
        ? "NEW"
        : product.badge === BadgeEnum.sale
          ? "SALE"
          : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group relative cursor-pointer card-gold-glow border border-transparent overflow-hidden bg-card"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image — portrait fashion ratio */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Badge — top-left feels more editorial */}
        {badgeLabel && (
          <div className="absolute top-0 left-0">
            <span className="block bg-gold text-black text-[9px] font-bold tracking-[0.25em] px-3 py-1.5 uppercase">
              {badgeLabel}
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        >
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-foreground text-background text-[10px] tracking-[0.25em] font-semibold px-7 py-3 hover:bg-gold hover:text-black transition-colors duration-200 uppercase"
            data-ocid={`products.add_button.${index + 1}`}
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            Quick Add
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-5 px-1">
        <p className="text-[11px] tracking-[0.22em] text-foreground/90 uppercase font-medium truncate leading-none">
          {product.name}
        </p>
        <p className="text-xs tracking-[0.15em] text-gold mt-2.5 font-light">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
