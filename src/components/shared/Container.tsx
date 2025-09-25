import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto w-full pb-12 md:pb-20 px-4 md:px-6 lg:px-[112px] max-w-[1216px]", className)}
    >
      {children}
    </div>
  );
};
