import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto w-full px-4 md:px-10 lg:px-[120px] max-w-[1536px]", className)}
    >
      {children}
    </div>
  );
};
