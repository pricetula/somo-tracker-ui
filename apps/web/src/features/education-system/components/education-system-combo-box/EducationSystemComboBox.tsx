"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
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
import { useEducationSystemsStore } from "../../store"
import { EducationSystem } from "../../types"

interface EducationSystemComboBoxProps {
    id: string
    initValue?: string
    onSetValue(v: EducationSystem): void
}

export function EducationSystemComboBox({ id, initValue, onSetValue }: EducationSystemComboBoxProps) {
    const educationSystems = useEducationSystemsStore((s) => s.educationSystems)
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const selectedEducationSystem = value && educationSystems.find((educationSystem) => educationSystem.id === value) || null

    React.useEffect(() => {
        if (!selectedEducationSystem && initValue) {
            setValue(initValue)
        }
    }, [initValue, selectedEducationSystem])

    React.useEffect(() => {
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
                >
                    {selectedEducationSystem?.name || "Select education system..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search education system..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No education system found.</CommandEmpty>
                        <CommandGroup>
                            {educationSystems.map((educationSystem) => (
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