// src/i18n/rich.tsx
import { Fragment } from 'react';

/**
 * Merender string kamus yang memuat penanda **tebal** dan __miring__.
 * Dipakai untuk kalimat yang sebagian katanya perlu di-highlight, supaya kamus tetap berupa string biasa.
 */
export default function Rich({ text, boldClassName = 'font-bold' }: { text: string; boldClassName?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className={boldClassName}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('__') && part.endsWith('__')) return <i key={i}>{part.slice(2, -2)}</i>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
