import { type KeyboardEvent, useState } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
  badgeClassName: string; // dùng để phân biệt tag color của required skills và benefits
}

export function TagInput({
  value,
  onChange,
  placeholder,
  badgeClassName,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedValue = inputValue.trim();

      if (trimmedValue && !value.includes(trimmedValue)) {
        onChange([...value, trimmedValue]);
        setInputValue("");
      }
    }

    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      const updatedTags = [...value];
      updatedTags.pop();
      onChange(updatedTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="stacked-tag-box">
      <div className="flex flex-wrap gap-2 min-h-7">
        {value.map((tag) => (
          <span key={tag} className={badgeClassName ?? "tag-badge-indigo"}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="tag-close-btn"
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
        placeholder={placeholder ?? "Type and press Enter..."}
        className="tag-input-field"
      />
    </div>
  );
}
