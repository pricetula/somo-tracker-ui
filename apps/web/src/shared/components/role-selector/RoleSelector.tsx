"use client"

import { useMemo, useState } from "react"
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
import { Role } from "@/shared/types/user"

interface RoleSelectorProps {
    id: string
    value?: string
    onSetValue(v: string): void
    filterOutRoles?: Role[]
    disabled?: boolean
}

export function RoleSelector({ id, disabled = false, value, onSetValue, filterOutRoles }: RoleSelectorProps) {
    const [open, setOpen] = useState(false)

    const filteredRoles = useMemo(() => filterOutRoles && filterOutRoles?.length > 0 ? roleOptions.filter(
        (r) => !filterOutRoles.includes(r.value)
    ) : roleOptions, [filterOutRoles])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    disabled={disabled}
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
                            {filteredRoles.map((option) => (
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