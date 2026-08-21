"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const exec = (command: string, value?: string) => {
  document.execCommand(command, false, value);
};

function ToolbarButton({
  onMouseDown,
  label,
  children,
  active,
}: {
  onMouseDown: () => void;
  label: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown();
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink",
        active && "bg-primary-50 text-primary-700"
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  label,
  error,
  id,
  minHeight = 160,
  placeholder = "Write something…",
}: {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  error?: string;
  id?: string;
  minHeight?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
      lastValue.current = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleInput() {
    const html = ref.current?.innerHTML ?? "";
    lastValue.current = html;
    onChange(html);
  }

  function insertLink() {
    const url = window.prompt("Enter the link URL");
    if (url) exec("createLink", url);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          "overflow-hidden rounded-md border border-border bg-surface transition-[border-color,box-shadow] duration-200",
          error
            ? "border-[rgb(var(--error))] shadow-[0_0_0_2px_rgb(var(--error)/0.15)]"
            : "focus-within:border-primary-600 focus-within:shadow-[0_0_0_2px_rgb(var(--ring-focus))]"
        )}
      >
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface-muted/60 px-2 py-1.5">
          <ToolbarButton label="Undo" onMouseDown={() => exec("undo")}>
            <Undo2 size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Redo" onMouseDown={() => exec("redo")}>
            <Redo2 size={16} aria-hidden />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-border" />
          <ToolbarButton label="Bold" onMouseDown={() => exec("bold")}>
            <Bold size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Italic" onMouseDown={() => exec("italic")}>
            <Italic size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Underline" onMouseDown={() => exec("underline")}>
            <Underline size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Strikethrough" onMouseDown={() => exec("strikeThrough")}>
            <Strikethrough size={16} aria-hidden />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-border" />
          <ToolbarButton label="Heading 2" onMouseDown={() => exec("formatBlock", "h2")}>
            <Heading2 size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Heading 3" onMouseDown={() => exec("formatBlock", "h3")}>
            <Heading3 size={16} aria-hidden />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-border" />
          <ToolbarButton label="Bullet list" onMouseDown={() => exec("insertUnorderedList")}>
            <List size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Numbered list" onMouseDown={() => exec("insertOrderedList")}>
            <ListOrdered size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Blockquote" onMouseDown={() => exec("formatBlock", "blockquote")}>
            <Quote size={16} aria-hidden />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-border" />
          <ToolbarButton label="Insert link" onMouseDown={insertLink}>
            <Link2 size={16} aria-hidden />
          </ToolbarButton>
          <ToolbarButton label="Remove link" onMouseDown={() => exec("unlink")}>
            <Link2Off size={16} aria-hidden />
          </ToolbarButton>
        </div>

        <div
          ref={ref}
          id={id}
          role="textbox"
          aria-multiline="true"
          aria-invalid={error ? true : undefined}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          className="rich-text-editor"
          style={{ minHeight }}
        />
      </div>

      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-body-sm text-error-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}
