import C from "./constants";

export function Eyebrow({ children }) {
  return (
    <div
      className="inline-block mb-4 px-3 py-1.5 text-xs rounded-md"
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
    <div className="mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.text }}>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;
