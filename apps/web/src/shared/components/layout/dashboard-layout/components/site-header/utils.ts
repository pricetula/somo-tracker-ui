import { BreadcrumbItem } from "@/shared/types/bread-crumbs";

export function parseBreadcrumbs(pathname: string): BreadcrumbItem[] {
    let id = 1

    // Remove leading/trailing slashes and split into segments
    const segments = pathname.split('/').filter(segment => segment !== '');

    // If no segments, return Dashboard
    if (segments.length === 0) {
        return [{ id, label: 'Dashboard', href: '/', isLast: true }];
    }

    const items: BreadcrumbItem[] = [];

    // Add Dashboard as first item
    items.push({
        id,
        label: 'Dashboard',
        href: '/',
        isLast: false
    });

    // Process each segment
    segments.forEach((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // Create label based on segment
        let label: string;

        // Check if it's a UUID (or similar ID pattern)
        if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // It's a UUID, use previous segment to determine context
            const prevSegment = index > 0 ? segments[index - 1] : '';

            switch (prevSegment) {
                case 'school':
                    label = `School ${segment.substring(0, 3)}...`;
                    break;
                case 'exam':
                    label = `Exam ${segment.substring(0, 3)}...`;
                    break;
                case 'students':
                    label = `Student ${segment.substring(0, 3)}...`;
                    break;
                default:
                    label = segment.substring(0, 3) + '...';
            }
        } else {
            // It's a regular segment, capitalize it
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
        }

        id++

        items.push({
            id,
            label,
            href,
            isLast
        });
    });

    return items;
};
