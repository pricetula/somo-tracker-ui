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
import { roleOptions } from "@/shared/utils/constants"

interface RoleSelectorProps {
    id: string
    initValue?: string
    onSetValue(v: string): void
}

export function RoleSelector({ id, initValue, onSetValue }: RoleSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const selectedOption = value && roleOptions.find((option) => option.value === value) || null

    React.useEffect(() => {
        if (!selectedOption && initValue) {
            setValue(initValue)
        }
    }, [initValue, selectedOption])

    React.useEffect(() => {
        if (value) {
            onSetValue(value)
        }
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                >
                    {selectedOption?.label ? (
                        <span className={cn("p-.5 px-2 rounded-md", selectedOption.bgColor)}>{selectedOption.label}</span>
                    ) : "Select education system..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search education system..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No education system found.</CommandEmpty>
                        <CommandGroup>
                            {roleOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
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