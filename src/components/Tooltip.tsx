import React, { useEffect, useRef } from "react";

export default function Tooltip({ text = "entry text" }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (parent) {
      parent.classList.add("relative", "group");
    }
  }, []); // Runs only once when the component mounts

  return (
    <div
      ref={ref}
      className="absolute hidden group-hover:block rounded-lg border border-neutral-600 bg-neutral-900/50 backdrop-blur-sm px-3 py-2 -top-12 left-1/2 z-50 -translate-x-1/2"
    >
      <p className="text-sm truncate">{text}</p>
    </div>
  );
}
