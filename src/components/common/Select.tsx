import type {
  ChangeEvent,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "children"
  > {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
}

export function Select({
  options,
  label,
  error,
  helperText,
  placeholder,
  leftIcon,
  className = "",
  id,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: SelectProps) {
  const selectId =
    id ?? `select-${Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange?.(event);
  };

  const classes = [
    "select",
    error ? "select-error" : "",
    leftIcon ? "select-with-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="select-container">
      {label && (
        <label
          htmlFor={selectId}
          className="select-label"
        >
          {label}
        </label>
      )}

      <div className="select-wrapper">
        {leftIcon && (
          <span
            className="select-icon"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <select
          id={selectId}
          className={classes}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <span
          id={`${selectId}-error`}
          className="select-error-message"
        >
          {error}
        </span>
      )}

      {!error && helperText && (
        <span
          id={`${selectId}-helper`}
          className="select-helper"
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Select;