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
import { RoleDisplay } from "@/shared/components/role-display"

interface RoleSelectorProps {
    id: string
    value?: string
    onSetValue(v: string): void
}

export function RoleSelector({ id, value, onSetValue }: RoleSelectorProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                >
                    {value ? (
                        <RoleDisplay role={value} />
                    ) : "Select role"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search role" className="h-9" />
                    <CommandList>
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandGroup>
                            {roleOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setOpen(false)
                                        onSetValue(currentValue)
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