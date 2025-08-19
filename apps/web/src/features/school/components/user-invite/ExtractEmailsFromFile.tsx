"use client"

import { toast } from "sonner"
import { ChangeEvent, useState } from "react"
import { ChevronsUpDown, FileText } from "lucide-react"
import Papa from "papaparse"
import * as XLSX from "xlsx"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

interface ExtractEmailsFromFileProps {
    onExtractedEmails(emails: string[]): void
}

export function ExtractEmailsFromFile({ onExtractedEmails }: ExtractEmailsFromFileProps) {
    const [openColumnsDropdown, setOpenColumnsDropdown] = useState(false)
    const [columns, setColumns] = useState<string[]>([])
    const [items, setItems] = useState<any[]>([])

    function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
        // Check if files are present
        if (!event?.target?.files) {
            toast.error("No files found")
            return
        }

        // Extract the file uploaded
        const file = event.target.files[0]

        // If no file found return
        if (!file) {
            toast.error("No file found")
            return
        }

        if (file.name.endsWith(".csv")) {
            handleCsvUpload(file)
        } else if (file.name.endsWith(".xlsx")) {
            handleXlsxUpload(file)
        } else {
            toast.error("Invalid file type")
        }
    }

    function handleCsvUpload(file: File) {
        // Handle parsing of csv files obtaining columns and items parsed
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data.length > 0) {
                    const headers = Object.keys(results.data[0] || {})
                    setColumns(headers)
                    setItems(results.data.filter((i) => !!i))
                } else {
                    toast.error("CSV file is empty.")
                    setColumns([])
                }
            },
            error: () => {
                toast.error("Error parsing CSV")
                setColumns([])
            },
        })
    }

    function handleXlsxUpload(file: File) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            if (!sheetName) {
                toast.error("XLSX file is empty.")
                setColumns([])
                return
            }
            const worksheet = workbook.Sheets[sheetName]
            if (!worksheet) {
                toast.error("XLSX file is empty.")
                setColumns([])
                return
            }
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            if (json.length > 0) {
                // The first row is the header
                const headers = json[0] as string[]
                setColumns(headers)
                setItems(
                    json.slice(1)
                        .map((row: any) => {
                            const item: any = {}
                            headers.forEach((header, index) => {
                                item[header] = row[index]
                            })
                            return item
                        })
                        .filter((i: any) => !!i)
                )
            } else {
                toast.error("XLSX file is empty.")
                setColumns([])
            }
        }
        reader.onerror = () => {
            toast.error("Failed to read the XLSX file.")
            setColumns([])
        }
        reader.readAsArrayBuffer(file)
    }

    function handleSelectedColumn(col: string) {
        onExtractedEmails(items.map((item) => item[col]))
        setItems([])
        setColumns([])
        setOpenColumnsDropdown(false)
    }

    return (
        <div>
            <Label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
                <FileText size={14} />
                <span>Upload CSV / Excel</span>
            </Label>
            <Input
                id="file-upload"
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
                className="hidden"
            />

            <Dialog open={columns.length > 0}>
                <DialogContent className="w-[90%] max-w-[400px] pb-10">
                    <DialogHeader className="text-left">
                        <DialogTitle>Email column</DialogTitle>
                        <DialogDescription>
                            Select a column that contains email addresses.
                        </DialogDescription>
                    </DialogHeader>

                    <Popover open={openColumnsDropdown} onOpenChange={setOpenColumnsDropdown}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                role="combobox"
                            >
                                Select column
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search email" className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No email found.</CommandEmpty>
                                    <CommandGroup>
                                        {columns.map((option) => (
                                            <CommandItem
                                                key={option}
                                                value={option}
                                                onSelect={handleSelectedColumn}
                                            >
                                                {option}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </DialogContent>
            </Dialog>
        </div>
    )
}