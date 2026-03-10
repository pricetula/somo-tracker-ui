export interface BreadcrumbLink {
  label: string;
  href: string;
  isUuid?: boolean;
}

export interface BreadcrumbSegment extends BreadcrumbLink {
  isLast: boolean;
}
