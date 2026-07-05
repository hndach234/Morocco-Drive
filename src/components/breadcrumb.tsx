"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-brand-blue/60 dark:text-white/60 mb-6 font-medium">
      <Link href="/" className="flex items-center hover:text-brand-orange transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span>Accueil</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-orange transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-blue dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
