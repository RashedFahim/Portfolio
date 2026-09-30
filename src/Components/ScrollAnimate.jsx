function ScrollAnimate({ children, className = "", delay = 0, direction = "up" }) {
  const directionClass = {
    up: "animate-up",
    down: "animate-down",
    left: "animate-left",
    right: "animate-right",
    scale: "animate-scale",
    fade: "animate-fade",
  }[direction] || "animate-up";

  const safeDelay = Math.min(320, Math.max(0, Number(delay) || 0));

  return (
    <div
      className={`scroll-animate ${directionClass} ${className}`}
      style={{ "--scroll-delay": `${safeDelay}ms` }}
    >
      {children}
    </div>
  );
}

export default ScrollAnimate;
