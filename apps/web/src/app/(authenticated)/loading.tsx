import { Loader2 } from "lucide-react";

export default function AuthenticatedLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin text-muted-foreground" size={24} />
        </div>
    );
}
