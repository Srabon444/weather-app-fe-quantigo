import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 pt-4 pb-12 md:px-6 md:pt-6 md:pb-20 lg:px-[112px] lg:pt-12 max-w-[1536px]',
        className
      )}
    >
      {children}
    </div>
  );
};
