"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatSegmentLabel, isUuid } from "@/lib/utils/format-breadcrumb";
import type { BreadcrumbSegment } from "@/types/navigation";

const COLLAPSE_THRESHOLD = 4;

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs: BreadcrumbSegment[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: formatSegmentLabel(segment),
      href,
      isUuid: isUuid(segment),
      isLast: index === segments.length - 1,
    };
  });

  const shouldCollapse = crumbs.length > COLLAPSE_THRESHOLD;
  const firstCrumb = crumbs[0];
  const lastCrumb = crumbs[crumbs.length - 1];
  const collapsedCrumbs = crumbs.slice(1, crumbs.length - 1);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap overflow-x-auto">
        {!shouldCollapse &&
          crumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.href}>
              {crumb.isLast ? (
                <BreadcrumbPage className="max-w-[160px] truncate">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}

        {shouldCollapse && firstCrumb && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={firstCrumb.href}>{firstCrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {collapsedCrumbs.map((crumb) => (
                    <DropdownMenuItem key={crumb.href} asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            {lastCrumb && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-[160px] truncate">
                    {lastCrumb.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
