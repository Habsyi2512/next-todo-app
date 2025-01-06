import React, { HTMLProps } from "react";

interface ComponentProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ContentDiv({
  children,
  className,
  ...props
}: ComponentProps) {
  return (
    <div {...props} className={`${className} p-2`}>
      {children}
    </div>
  );
}
