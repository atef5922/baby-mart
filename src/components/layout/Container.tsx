import type * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn("mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8 2xl:px-10", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
