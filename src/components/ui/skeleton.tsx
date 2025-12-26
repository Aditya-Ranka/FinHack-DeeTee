import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "button" | "avatar" | "price";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variants = {
    default: "h-4 w-full",
    card: "h-40 w-full rounded-2xl",
    text: "h-5 w-3/4",
    button: "h-14 w-full rounded-xl",
    avatar: "h-14 w-14 rounded-full",
    price: "h-8 w-24",
  };

  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton layouts for common use cases
function CardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-5 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton variant="button" />
    </div>
  );
}

function PriceCardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-28" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border-2 border-border bg-card p-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-16 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border-2 border-border bg-card p-5 space-y-3">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton variant="button" className="h-[4.5rem]" />
        <Skeleton variant="button" className="h-[4.5rem]" />
        <Skeleton variant="button" className="h-[4.5rem]" />
      </div>
    </div>
  );
}

export { Skeleton, CardSkeleton, PriceCardSkeleton, ListSkeleton, DashboardSkeleton };
