import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { label: "Women", href: "#new-arrivals" },
  { label: "Men", href: "#new-arrivals" },
  { label: "New In", href: "#new-arrivals" },
  { label: "Stories", href: "#philosophy" },
];

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[60px] md:h-[72px] flex items-center justify-between">
          {/* Left nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
                className="text-[11px] tracking-[0.18em] text-foreground/50 hover:text-foreground transition-colors duration-300 font-normal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            data-ocid="nav.open_modal_button"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Center wordmark */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl md:text-2xl tracking-[0.45em] text-foreground hover:text-gold transition-colors duration-500 select-none"
            aria-label="Velmora home"
            data-ocid="nav.home.link"
          >
            VELMORA
          </a>

          {/* Right utility */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              type="button"
              className="hidden md:block text-foreground/40 hover:text-foreground transition-colors duration-200"
              aria-label="Search"
              data-ocid="nav.search.button"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="hidden md:block text-foreground/40 hover:text-foreground transition-colors duration-200"
              aria-label="Account"
              data-ocid="nav.account.button"
            >
              <User size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onCartOpen}
              className="relative text-foreground/60 hover:text-foreground transition-colors duration-200"
              aria-label={`Cart (${cartCount} items)`}
              data-ocid="nav.cart.button"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-[9px] font-bold text-black w-[18px] h-[18px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
            data-ocid="nav.modal"
          >
            <div className="flex items-center justify-between px-6 h-[60px] border-b border-border/40">
              <span className="font-display text-xl tracking-[0.4em] text-foreground">
                VELMORA
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close menu"
                data-ocid="nav.close_button"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-12 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-[2.5rem] leading-tight tracking-wide py-4 border-b border-border/20 text-foreground/80 hover:text-foreground transition-colors"
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(" ", "-")}.link`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-6 pb-10">
              <p className="text-[10px] tracking-[0.4em] text-foreground/20 uppercase">
                New Season · SS26
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
