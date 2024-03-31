
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
    options?: Array<string>,
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
            ? options.find((option) => option === props.value) ?? label
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
                key={option}
                value={option}
                onSelect={(currentValue) => {
                  console.log(currentValue)
                  props?.onChange(currentValue === props.value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    props.value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
