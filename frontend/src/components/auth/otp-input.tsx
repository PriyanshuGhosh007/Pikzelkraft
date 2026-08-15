"use client";

import { useRef } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  className?: string;
};

export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
  error,
  errorMessage,
  autoFocus,
  className,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function emit(next: string) {
    onChange(next);
    if (next.length === OTP_LENGTH && onComplete) {
      onComplete(next);
    }
  }

  function handleChange(index: number, raw: string) {
    if (disabled) return;
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const chars = value.split("");
    chars[index] = digit;
    emit(chars.join(""));
    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (value[index]) {
        const chars = value.split("");
        chars.splice(index, 1);
        emit(chars.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (disabled) return;
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const chars = value.split("");
    for (let i = 0; i < pasted.length; i++) {
      chars[index + i] = pasted[i];
    }
    emit(chars.join(""));
    const focusIndex = Math.min(index + pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex gap-2.5">
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            autoFocus={autoFocus && index === 0}
            disabled={disabled}
            aria-label={`OTP digit ${index + 1}`}
            aria-invalid={error ? true : undefined}
            value={value[index] ?? ""}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
            onFocus={(event) => event.target.select()}
            className={cn(
              "h-14 w-full rounded-md border bg-surface text-center font-display text-h5 font-semibold tabular transition-colors duration-200",
              error
                ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
                : "border-border focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
              "focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        ))}
      </div>
      {errorMessage ? (
        <p className="flex items-center gap-1.5 text-body-sm text-error-text">{errorMessage}</p>
      ) : null}
    </div>
  );
}
