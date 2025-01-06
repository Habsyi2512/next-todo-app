import { SVGAttributes } from "react";

export function RemoveIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      data-slot="icon"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
