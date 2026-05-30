import type { TextareaHTMLAttributes } from "react";

type FieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helper?: string;
};

export function Field({ label, helper, id, className = "", ...props }: FieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block text-sm font-semibold text-ink">{label}</span>
      {helper ? <span className="mb-3 block text-sm leading-5 text-muted">{helper}</span> : null}
      <textarea
        className={`min-h-24 w-full resize-y rounded-[1.25rem] border border-white/90 bg-white/72 px-4 py-3 text-base leading-6 text-ink outline-none transition placeholder:text-muted/55 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/15 ${className}`}
        id={id}
        {...props}
      />
    </label>
  );
}
