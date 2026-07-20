import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-medium tracking-[0.18em] text-brand-gold ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-8 text-brand-muted sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark" | "text";
};

const variants = {
  primary: "bg-brand-forest text-white hover:bg-brand-forestLight",
  secondary:
    "border border-brand-border text-brand-forest hover:border-brand-forest hover:bg-brand-forest/5",
  light: "bg-brand-warmWhite text-brand-forest hover:bg-white",
  dark: "bg-brand-forestDark text-white hover:bg-brand-forest",
  text: "text-brand-forest underline-offset-4 hover:underline",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${variant === "text" ? "" : "rounded-full"} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
