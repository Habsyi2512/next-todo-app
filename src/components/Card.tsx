import React from "react";

interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
  ...props
}: ComponentProps) {
  return (
    <div
      {...props}
      className={`${className} border border-neutral-700/80 rounded-xl bg-neutral-800`}
    >
      {children}
    </div>
  );
}
