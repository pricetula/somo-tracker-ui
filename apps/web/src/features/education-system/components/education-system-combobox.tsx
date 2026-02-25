"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { useEducationSystems } from "@/features/education-system/api/use-education-systems";
import type { EducationSystem } from "@/features/education-system/types";

interface EducationSystemComboboxProps {
  value?: string;
  onChange: (educationSystem: EducationSystem | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function EducationSystemCombobox({
  value,
  onChange,
  disabled = false,
  placeholder = "Select education system…",
}: EducationSystemComboboxProps) {
  const { data } = useEducationSystems();
  const systems = data?.success ? data.data ?? [] : [];

  const selected = systems.find((s) => s.id === value) ?? null;

  return (
    <Combobox
      value={selected}
      onValueChange={(val) => onChange(val as EducationSystem | null)}
      disabled={disabled}
    >
      <ComboboxInput placeholder={placeholder} showClear={!!value} />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No education systems found.</ComboboxEmpty>
          {systems.map((system) => (
            <ComboboxItem key={system.id} value={system}>
              {system.name}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
