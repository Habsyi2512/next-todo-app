"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Divider from "./Divider";

export default function Navbar() {
  const pathname = usePathname();

  const navList = [
    { label: "Todo List", href: "/" },
    { label: "Completed", href: "/completed" },
    { label: "Removed", href: "/removed" },
  ];
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-5">Todo App</h1>
        <nav>
          <ul className="flex rounded-lg bg-neutral-800 w-fit py-2 px-1 space-x-1 border border-neutral-700">
            {navList.map((nav, index) => {
              return (
                <li key={index}>
                  <Link
                    href={nav.href}
                    className={`${
                      nav.href === pathname && "bg-neutral-600"
                    } px-2 py-2 hover:bg-neutral-600 rounded-md`}
                  >
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Divider />
    </>
  );
}
