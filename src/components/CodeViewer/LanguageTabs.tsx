import type { CodeLanguage } from "../../types/Algorithm";

interface LanguageTabsProps {
  language: CodeLanguage;
  onChange: (language: CodeLanguage) => void;
  disabled?: boolean;
}

interface LanguageOption {
  value: CodeLanguage;
  label: string;
  description: string;
}

const languageOptions: LanguageOption[] = [
  {
    value: "CPP",
    label: "C++",
    description: "Implementación en C++",
  },
  {
    value: "PYTHON",
    label: "Python",
    description: "Implementación en Python",
  },
];

export function LanguageTabs({
  language,
  onChange,
  disabled = false,
}: LanguageTabsProps) {
  return (
    <div className="language-tabs" role="tablist" aria-label="Lenguaje del código">
      {languageOptions.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`language-tab ${
              isActive ? "language-tab-active" : ""
            }`}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-label={option.description}
          >
            <span className="language-tab-icon" aria-hidden="true">
              {option.value === "CPP" ? "</>" : "🐍"}
            </span>

            <span className="language-tab-label">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageTabs;