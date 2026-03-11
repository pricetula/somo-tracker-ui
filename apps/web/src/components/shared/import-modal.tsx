"use client";

import { CsvImporter } from "@/components/shared/importer/csv-importer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ComponentProps } from "react";

type ImportModalProps = {
  title: string;
  description: string;
  onImport: ComponentProps<typeof CsvImporter>["onImport"];
  onClose: () => void;
};

export function ImportModal({ title, description, onImport, onClose }: ImportModalProps) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CsvImporter onImport={onImport} />
      </DialogContent>
    </Dialog>
  );
}
