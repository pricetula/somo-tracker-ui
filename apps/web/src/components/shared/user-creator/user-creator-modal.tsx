"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { AddUser } from "@/lib/importer-engine";
import { UserCreator } from "./user-creator";

interface UserCreatorModalProps {
  title: string;
  description: string;
  onImport: (users: AddUser[]) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
}

export function UserCreatorModal({ title, description, onImport, onClose }: UserCreatorModalProps) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <UserCreator onImport={onImport} />
      </DialogContent>
    </Dialog>
  );
}
