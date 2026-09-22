import { useMemo } from "react";
import type { AlgorithmType, CodeLanguage } from "../../types/Algorithm";
import { getAlgorithmInfo } from "../../types/Algorithm";
import { getAlgorithmCode } from "../../data/codeExamples";
import CodeLine from "./CodeLine";

interface CodeViewerProps {
  algorithm: AlgorithmType;
  language?: CodeLanguage;
  currentLine?: number;
  highlightedLines?: number[];
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeViewer({
  algorithm,
  language = "CPP",
  currentLine,
  highlightedLines = [],
  title = "Código del algoritmo",
  showLineNumbers = true,
}: CodeViewerProps) {
  const algorithmInfo = getAlgorithmInfo(algorithm);

  const code = useMemo(() => {
    return getAlgorithmCode(algorithm, language);
  }, [algorithm, language]);

  const codeLines = useMemo(() => {
    return code.split("\n");
  }, [code]);

  return (
    <section className="code-viewer">
      <div className="code-viewer-header">
        <div className="code-viewer-title-container">
          <div>
            <h2 className="code-viewer-title">{title}</h2>

            <p className="code-viewer-description">
              Implementación de {algorithmInfo.name}
            </p>
          </div>

          <div className="code-viewer-algorithm">
            {algorithmInfo.name}
          </div>
        </div>

        <div className="code-viewer-language">
          <span className="code-viewer-language-label">
            {language === "CPP" ? "C++" : "Python"}
          </span>
        </div>
      </div>

      <div className="code-viewer-content">
        <pre className="code-viewer-pre">
          <code className="code-viewer-code">
            {codeLines.map((line, index) => {
              const lineNumber = index + 1;

              const isActive = currentLine === lineNumber;

              const isHighlighted = highlightedLines.includes(lineNumber);

              if (!showLineNumbers) {
                return (
                  <div
                    className={[
                      "code-line",
                      isActive ? "code-line-active" : "",
                      isHighlighted ? "code-line-highlighted" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={lineNumber}
                  >
                    <code className="code-line-content">
                      {line || " "}
                    </code>
                  </div>
                );
              }

              return (
                <CodeLine
                  key={lineNumber}
                  lineNumber={lineNumber}
                  code={line}
                  active={isActive}
                  highlighted={isHighlighted}
                />
              );
            })}
          </code>
        </pre>
      </div>

      <div className="code-viewer-footer">
        <div className="code-viewer-info">
          <span>
            {codeLines.length} líneas
          </span>

          {currentLine !== undefined && (
            <span>
              Línea actual: {currentLine}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default CodeViewer;