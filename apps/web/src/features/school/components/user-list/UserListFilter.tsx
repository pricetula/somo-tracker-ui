import { ListFilter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function UserListFilter() {
    return (
        <Button size="sm" variant="ghost">
            <ListFilter size="12" />
            <span>Filter</span>
        </Button>
    )
}