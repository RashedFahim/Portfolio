import C from "./constants";
import ScrollAnimate from "./ScrollAnimate";

export default function Footer() {
  return (
    <ScrollAnimate direction="up" delay={80}>
      <footer className="py-8 text-center text-xs w-full" style={{ borderTop: `1px solid ${C.border}`, color: C.textMuted }}>
        © 2026 Md. Rashed Fahim Chowdhury.
      </footer>
    </ScrollAnimate>
  );
}
