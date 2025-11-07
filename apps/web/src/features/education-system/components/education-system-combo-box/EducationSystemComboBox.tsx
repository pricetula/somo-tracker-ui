"use client"

import { useState, useEffect, useMemo } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shared/components/ui/command"
import { EducationSystem } from "../../types"
import { useEducationSystemsQuery } from "../../hooks/useEducationSystemsQuery"

interface EducationSystemComboBoxProps {
    id: string
    initValue?: string
    onSetValue(v: EducationSystem): void
}

export function EducationSystemComboBox({ id, initValue, onSetValue }: EducationSystemComboBoxProps) {
    const { data: educationSystems, isPending } = useEducationSystemsQuery()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const selectedEducationSystem = useMemo(
        () => {
            if ((!value && !initValue) || !educationSystems) return null
            const vals = [value, initValue]
            return educationSystems.find((educationSystem) => vals.includes(educationSystem.id)) || null
        },
        [educationSystems, value]
    )

    useEffect(() => {
        if (selectedEducationSystem) {
            onSetValue(selectedEducationSystem)
        }
    }, [selectedEducationSystem])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={isPending}
                >
                    {
                        isPending
                            ? (
                                <span>
                                    <Spinner />
                                    <span>Loading...</span>
                                </span>
                            )
                            : (
                                <>
                                    {selectedEducationSystem?.name || "Select education system..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </>
                            )
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search education system..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No education system found.</CommandEmpty>
                        <CommandGroup>
                            {educationSystems && educationSystems.map((educationSystem) => (
                                <CommandItem
                                    key={educationSystem.id}
                                    value={educationSystem.id}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {educationSystem.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === educationSystem.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}