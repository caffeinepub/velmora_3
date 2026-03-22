import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartEntry } from "../App";
import { formatPrice, getProductImage } from "./ProductCard";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartEntry[];
  onRemove: (productId: bigint) => void;
  onUpdateQuantity: (productId: bigint, quantity: number) => void;
  cartId: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onUpdateQuantity,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            data-ocid="cart.modal"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[80] bg-[oklch(0.11_0.003_260)] border-l border-border flex flex-col"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <span className="font-display text-lg tracking-[0.2em] uppercase">
                  Your Cart
                </span>
                {cartItems.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({cartItems.length})
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-foreground/60 hover:text-gold transition-colors"
                aria-label="Close cart"
                data-ocid="cart.close_button"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart items */}
            {cartItems.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag size={40} className="text-border" />
                <p className="text-sm tracking-widest uppercase text-muted-foreground">
                  Your cart is empty
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs tracking-[0.2em] text-gold border border-gold px-8 py-3 rounded-sm hover:bg-gold hover:text-black transition-all duration-300 uppercase"
                  data-ocid="cart.continue_shopping.button"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-6">
                    {cartItems.map((item, i) => (
                      <div
                        key={item.product.id.toString()}
                        className="flex gap-4"
                        data-ocid={`cart.item.${i + 1}`}
                      >
                        {/* Product image */}
                        <div className="w-20 h-24 flex-none overflow-hidden rounded-sm bg-card">
                          <img
                            src={getProductImage(item.product, i)}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] tracking-widest uppercase text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gold mt-1">
                            {formatPrice(item.product.price)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-6 h-6 border border-border rounded-sm flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                              aria-label="Decrease quantity"
                              data-ocid={`cart.minus.${i + 1}`}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-6 h-6 border border-border rounded-sm flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                              aria-label="Increase quantity"
                              data-ocid={`cart.plus.${i + 1}`}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => onRemove(item.product.id)}
                          className="self-start text-border hover:text-destructive transition-colors mt-0.5"
                          aria-label={`Remove ${item.product.name}`}
                          data-ocid={`cart.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-6 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Subtotal
                    </span>
                    <span className="font-display text-lg text-foreground">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <Separator className="mb-4 bg-border" />
                  <button
                    type="button"
                    className="w-full bg-gold text-black text-xs tracking-[0.25em] font-semibold py-4 rounded-sm hover:bg-gold-bright transition-colors duration-300 uppercase"
                    data-ocid="cart.checkout.button"
                  >
                    Proceed To Checkout
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-3 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase py-2"
                    data-ocid="cart.cancel_button"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
