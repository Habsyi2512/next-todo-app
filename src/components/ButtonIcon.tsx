"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ButtonIcon({
  children,
  className,
  ...props
}: ComponentProps) {
  return (
    <button {...props} className={`${className} px-4 py-2 rounded-lg shadow`}>
      {children}
    </button>
  );
}
