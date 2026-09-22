import type { CSSProperties } from "react";

interface CodeLineProps {
  lineNumber: number;
  code: string;
  highlighted?: boolean;
  active?: boolean;
  error?: boolean;
  className?: string;
}

export function CodeLine({
  lineNumber,
  code,
  highlighted = false,
  active = false,
  error = false,
  className = "",
}: CodeLineProps) {
  const classes = [
    "code-line",
    highlighted ? "code-line-highlighted" : "",
    active ? "code-line-active" : "",
    error ? "code-line-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties = {
    "--code-line-number": `"${lineNumber}"`,
  } as CSSProperties;

  return (
    <div
      className={classes}
      style={style}
      data-line-number={lineNumber}
      role="presentation"
    >
      <span className="code-line-number" aria-hidden="true">
        {lineNumber}
      </span>

      <code className="code-line-content">
        {code || " "}
      </code>
    </div>
  );
}

export default CodeLine;