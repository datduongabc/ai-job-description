import { useState, type KeyboardEvent } from "react";

interface TagInputProps {
  label: string;
  tags: string[];
  placeholder: string;
  badgeClass: string;
  error?: string;
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
}

export function TagInput({
  label,
  tags,
  placeholder,
  badgeClass,
  error,
  onAdd,
  onRemove,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onAdd(trimmed);
        setInputValue("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <label className="form-label">{label}</label>
      <div className="stacked-tag-box">
        <div className="flex flex-wrap gap-2 min-h-7">
          {tags.map((tag, index) => (
            <span key={tag + index} className={badgeClass}>
              {tag}
              <button
                type="button"
                className="tag-close-btn"
                onClick={() => onRemove(index)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="tag-input-field"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
