import { Separator } from "@/components/ui/separator";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { SiTiktok } from "react-icons/si";

const SHOP_LINKS = ["Women", "Men", "New In", "Sale", "Accessories"];
const COMPANY_LINKS = [
  "About",
  "Stories",
  "Sustainability",
  "Careers",
  "Press",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      className="bg-[oklch(0.07_0.002_260)] border-t border-border"
      aria-label="Footer"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Top section: 3 columns */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-3xl tracking-[0.3em] mb-3">
              VELMORA
            </p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
              Wear Your Truth
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-gold transition-colors"
                aria-label="Instagram"
                data-ocid="footer.instagram.link"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-gold transition-colors"
                aria-label="Twitter / X"
                data-ocid="footer.twitter.link"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-gold transition-colors"
                aria-label="TikTok"
                data-ocid="footer.tiktok.link"
              >
                <SiTiktok size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-gold transition-colors"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <Youtube size={18} />
              </a>
            </div>
          </motion.div>

          {/* Link columns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-5">
                Shop
              </p>
              <ul className="space-y-3">
                {SHOP_LINKS.map((link) => (
                  <li key={link}>
                    <a
                      href="#new-arrivals"
                      className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
                      data-ocid={`footer.shop.${link.toLowerCase()}.link`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-5">
                Company
              </p>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a
                      href="/"
                      className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
                      data-ocid={`footer.company.${link.toLowerCase()}.link`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-5">
              Join The Inner Circle
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Exclusive drops, early access, and stories from the edge of
              fashion.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-0"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 bg-input border border-border border-r-0 text-[11px] tracking-widest px-4 py-3 placeholder:text-foreground/30 text-foreground focus:outline-none focus:border-gold rounded-sm rounded-r-none transition-colors"
                aria-label="Email address"
                data-ocid="footer.newsletter.input"
              />
              <button
                type="submit"
                className="bg-gold text-black text-[10px] tracking-[0.2em] font-semibold px-5 py-3 hover:bg-gold-bright transition-colors rounded-sm rounded-l-none uppercase whitespace-nowrap"
                data-ocid="footer.newsletter.submit_button"
              >
                Sign Up
              </button>
            </form>
          </motion.div>
        </div>

        <Separator className="my-12 bg-border/40" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest text-muted-foreground uppercase">
          <p>© {year} Velmora. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-bright transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
