
"use client";

import { Archive, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArchiveProductButtonProps {
    productId: string;
    productName: string;
    isArchived: boolean;
}

export function ArchiveProductButton({ productId, productName, isArchived }: ArchiveProductButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleArchive = async () => {
        const action = isArchived ? "unarchive" : "archive";
        if (!confirm(`Are you sure you want to ${action} "${productName}"?`)) {
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/products`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId, isArchived: !isArchived }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update");
            }

            router.refresh();
        } catch (error) {
            alert((error as Error).message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleArchive}
            disabled={isLoading}
            className={`p-1 transition-colors disabled:opacity-50 ${isArchived ? "text-emerald-500 hover:text-emerald-700" : "text-gray-400 hover:text-amber-600"}`}
            title={isArchived ? "Unarchive Product" : "Archive Product"}
        >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Archive size={16} />}
        </button>
    );
}
