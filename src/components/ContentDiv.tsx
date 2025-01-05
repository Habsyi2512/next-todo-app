import React from "react";

export default function ContentDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className} p-5`}>{children}</div>;
}
