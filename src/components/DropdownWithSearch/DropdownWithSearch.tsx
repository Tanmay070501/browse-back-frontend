
import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
// import {Command} from  "cmdk"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { CommandList } from "cmdk"

// const frameworks = [
//     {
//       value: "next.js",
//       label: "Next.js",
//     },
//     {
//       value: "sveltekit",
//       label: "SvelteKit",
//     },
//     {
//       value: "nuxt.js",
//       label: "Nuxt.js",
//     },
//     {
//       value: "remix",
//       label: "Remix",
//     },
//     {
//       value: "astro",
//       label: "Astro",
//     },
//   ]
  
interface Props {
    options?: Array<{
        label: string,
        value: string
    }>,
    label?: string,
    notFoundLabel?: string,
    searchLabel?: string,
    value: string,
    onChange: (value: string) => void
}
export function DropdownWithSearch(props: Props) {
  const [open, setOpen] = React.useState(false)
  const label = props?.label ?? "Select Something"
  const notFoundLabel = props?.notFoundLabel ?? "Not found anything."
  const searchLabel = props?.searchLabel ?? "Search Something"
  const options = props?.options ?? []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[175px] justify-between"
        >
          {props.value
            ? options.find((option) => option.value === props.value)?.label
            : label}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[175px] p-0">
        <Command>
          <CommandInput placeholder={searchLabel} />
          <CommandEmpty>{notFoundLabel}</CommandEmpty>
        <CommandList>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    // className
                )}
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                console.log(currentValue)
                  props?.onChange(currentValue === props.value ? "" : currentValue)
                  setOpen(false)
                }}
                disabled={false}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    props.value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
