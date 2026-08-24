import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  SCROLL ANIMATION COMPONENT                                       */
/* ------------------------------------------------------------------ */

function ScrollAnimate({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
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
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default ScrollAnimate;
