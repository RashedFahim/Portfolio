import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  SCROLL ANIMATION COMPONENT (PERFORMANCE OPTIMIZED)               */
/* ------------------------------------------------------------------ */

function ScrollAnimate({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If element is already animated, don't observe
    if (el.classList.contains('animate-in')) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Unobserve immediately once triggered so scrolling is not burdened
            observer.unobserve(entry.target);
            if (delay > 0) {
              setTimeout(() => {
                if (ref.current) {
                  ref.current.classList.add('animate-in');
                }
              }, delay);
            } else {
              entry.target.classList.add('animate-in');
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const directionClass = {
    up: 'animate-up',
    down: 'animate-down',
    left: 'animate-left',
    right: 'animate-right',
    scale: 'animate-scale',
    fade: 'animate-fade'
  }[direction] || 'animate-up';

  return (
    <div
      ref={ref}
      className={`scroll-animate ${directionClass} ${className}`}
    >
      {children}
    </div>
  );
}

export default ScrollAnimate;
