import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: Props) {
  return (
    <div className={`premium-card p-6 ${className}`}>
      {children}
    </div>
  );
}
