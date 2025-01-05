import React from "react";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} border border-neutral-700/80 rounded-xl bg-neutral-800`}
    >
      {children}
    </div>
  );
}
