import React from "react";
import clsx from "clsx";
type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

type fontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "black";

interface TypographProps {
  fontSize?: FontSize;
  fontWeight?: fontWeight;
  children: React.ReactNode;
}

export default function Typograph({
  children = "Text",
  fontSize = "base",
  fontWeight = "normal",
}: TypographProps) {
  return (
    <p
      className={clsx(
        `text-neutral-300`,
        `font-${fontWeight}`,
        `text-${fontSize}`
      )}
    >
      {children}
    </p>
  );
}
