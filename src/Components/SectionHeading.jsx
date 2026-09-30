import C from "./constants";

export function Eyebrow({ children, className = "" }) {
  return (
    <div
      className={`section-eyebrow inline-block mb-4 px-3 py-1.5 text-xs rounded-md ${className}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: C.green,
        border: `1px solid ${C.green}55`,
        background: C.greenSoft,
      }}
    >
      {"// "}
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title text-3xl md:text-4xl font-bold" style={{ color: C.text }}>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;
