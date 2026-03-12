const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ROUTE_LABELS: Record<string, string> = {
    schools: "Schools",
    cohorts: "Cohorts",
    "academic-years": "Academic Years",
    settings: "System Settings",
};

export function isUuid(segment: string): boolean {
    return UUID_REGEX.test(segment);
}

export function formatSegmentLabel(segment: string): string {
    if (ROUTE_LABELS[segment]) {
        return ROUTE_LABELS[segment];
    }

    if (isUuid(segment)) {
        return "Details";
    }

    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
