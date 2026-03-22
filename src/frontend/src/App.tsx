import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import type { Product } from "./backend.d";
import CartDrawer from "./components/CartDrawer";
import CuratedStrip from "./components/CuratedStrip";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Philosophy from "./components/Philosophy";
import { useGetAllProducts } from "./hooks/useQueries";

function getCartId(): string {
  let id = localStorage.getItem("velmora-cart-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("velmora-cart-id", id);
  }
  return id;
}

const CART_ID = getCartId();

export interface CartEntry {
  product: Product;
  quantity: number;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const { data: products = [], isLoading: productsLoading } =
    useGetAllProducts();

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: bigint) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId),
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <NewArrivals
          products={products}
          isLoading={productsLoading}
          onAddToCart={addToCart}
        />
        <Philosophy />
        <CuratedStrip products={products} onAddToCart={addToCart} />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        cartId={CART_ID}
      />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}
