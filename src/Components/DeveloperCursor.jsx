import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CUSTOM ANIMATED CURSOR COMPONENT                                 */
/* ------------------------------------------------------------------ */

function DeveloperCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame;

    const updatePosition = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, .clickable, [role="button"], input, textarea, .ext-link, .nav-link, .card-hover'
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (target.x - prev.x) * 0.12,
        y: prev.y + (target.y - prev.y) * 0.12,
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  if (!isVisible) return null;

  const darkGreen = '#10B981';

  return (
    <>
      <div
        className="fixed pointer-events-none z-99999"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: isHovering ? '8px' : '5px',
            height: isHovering ? '8px' : '5px',
            background: darkGreen,
            boxShadow: `0 0 20px ${darkGreen}44`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? '36px' : '22px',
            height: isHovering ? '36px' : '22px',
            border: `1.5px solid ${isHovering ? darkGreen : `${darkGreen}66`}`,
            opacity: isHovering ? 1 : 0.5,
          }}
        />
      </div>

      <style>{`
        * { cursor: none !important; }
        @media (hover: none) and (pointer: coarse) {
          * { cursor: auto !important; }
          .fixed.pointer-events-none { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default DeveloperCursor;
