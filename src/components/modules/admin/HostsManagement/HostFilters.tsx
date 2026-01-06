// "use client";
// import RefreshButton from "@/components/shared/RefreshButton";
// import SearchFilter from "@/components/shared/SearchFilter";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useDebounce } from "@/hooks/useDebounce";
// import { IEvent } from "@/types/event.interface";
// import { Check, ChevronsUpDown, Filter, X } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";

// interface HostFiltersProps {
//   event: IEvent;
// }

// const HostFilters = ({ event }: HostFiltersProps) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isPending, startTransition] = useTransition();
//   const [open, setOpen] = useState(false);

//   const [localEventCategories, setLocalEventCategories] = useState<string[]>(
//     () => searchParams.getAll("eventCategories") || []
//   );

//   const [emailInput, setEmailInput] = useState(
//     () => searchParams.get("email") || ""
//   );
//   const [contactNumberInput, setContactNumberInput] = useState(
//     () => searchParams.get("contactNumber") || ""
//   );

//   // const debouncedGender = useDebounce(genderInput, 300);
//   const debouncedEmail = useDebounce(emailInput, 500);
//   const debouncedContactNumber = useDebounce(contactNumberInput, 500);

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (debouncedEmail) {
//       params.set("email", debouncedEmail);
//     } else {
//       params.delete("email");
//     }

//     if (debouncedContactNumber) {
//       params.set("contactNumber", debouncedContactNumber);
//     } else {
//       params.delete("contactNumber");
//     }

//     // Reset to page 1 when filters change
//     params.set("page", "1");

//     startTransition(() => {
//       router.push(`?${params.toString()}`);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [debouncedEmail, debouncedContactNumber]);

//   const eventCategory = event.category;

//   const toggleEventCategory = (specialtyId: string) => {
//     const newSelection = localEventCategories.includes(specialtyId)
//       ? localEventCategories.filter((id) => id !== specialtyId)
//       : [...localEventCategories, specialtyId];

//     setLocalEventCategories(newSelection);
//   };

//   const applySpecialtyFilter = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.delete("specialties");
//     if (localSpecialties.length > 0) {
//       localSpecialties.forEach((val) => params.append("specialties", val));
//     }
//     params.set("page", "1");

//     startTransition(() => {
//       router.push(`?${params.toString()}`);
//     });
//     setOpen(false);
//   };

//   const clearAllFilters = () => {
//     setEmailInput("");
//     setContactNumberInput("");
//     setLocalEventCategories([]);
//     startTransition(() => {
//       router.push(window.location.pathname);
//     });
//   };

//   const activeFiltersCount =
//     localEventCategories.length +
//     (emailInput ? 1 : 0) +
//     (contactNumberInput ? 1 : 0);

//   return (
//     <div className="space-y-3">
//       {/* Row 1: Search and Refresh */}
//       <div className="flex items-center gap-3">
//         <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
//         <RefreshButton />
//       </div>

//       {/* Row 2: Filter Controls */}
//       <div className="flex items-center gap-3">
//         {/* Specialties Multi-Select */}
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open}
//               className="w-60 justify-between h-10"
//             >
//               <Filter className="mr-2 h-4 w-4" />
//               {localEventCategories.length > 0
//                 ? `${localEventCategories.length} selected`
//                 : "Select Categories"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-60 p-0" align="start">
//             <Command>
//               <CommandInput placeholder="Search specialties..." />
//               <CommandList>
//                 <CommandEmpty>No Event found.</CommandEmpty>
//                 <CommandGroup>
//                   {eventCategories.map((category) => {
//                     const isSelected = localEventCategories.includes(
//                       category.title
//                     );
//                     return (
//                       <CommandItem
//                         key={category.id}
//                         value={category.title}
//                         onSelect={() => toggleEventCategory(category.title)}
//                         className={isSelected ? "bg-accent" : ""}
//                       >
//                         <Checkbox checked={isSelected} className="mr-2" />
//                         <span className={isSelected ? "font-medium" : ""}>
//                           {category.title}
//                         </span>
//                         {isSelected && (
//                           <Check className="ml-auto h-4 w-4 text-primary" />
//                         )}
//                       </CommandItem>
//                     );
//                   })}
//                 </CommandGroup>
//               </CommandList>
//               <div className="p-2 border-t">
//                 <Button
//                   onClick={applySpecialtyFilter}
//                   className="w-full"
//                   size="sm"
//                   disabled={isPending}
//                 >
//                   Apply Filter
//                 </Button>
//               </div>
//             </Command>
//           </PopoverContent>
//         </Popover>

//         {/* Email Filter */}
//         <Input
//           type="email"
//           placeholder="Email"
//           value={emailInput}
//           onChange={(e) => setEmailInput(e.target.value)}
//           className="w-[200px] h-10"
//           disabled={isPending}
//         />

//         {/* Contact Number Filter */}
//         <Input
//           type="text"
//           placeholder="Contact"
//           value={contactNumberInput}
//           onChange={(e) => setContactNumberInput(e.target.value)}
//           className="w-40 h-10"
//           disabled={isPending}
//         />

//         {/* Clear Filters */}
//         {activeFiltersCount > 0 && (
//           <Button
//             variant="ghost"
//             onClick={clearAllFilters}
//             disabled={isPending}
//             className="h-10 px-3"
//           >
//             <X className="h-4 w-4 mr-1" />
//             Clear ({activeFiltersCount})
//           </Button>
//         )}
//       </div>

//       {/* Row 3: Active Specialty Badges - Fixed Height to Prevent Shift */}

//       {localEventCategories.length > 0 && (
//         <div className="min-h-8 flex items-center">
//           <div className="flex flex-wrap gap-2">
//             {localEventCategories.map((categoryTitle) => (
//               <Badge
//                 key={categoryTitle}
//                 variant="outline"
//                 className="px-2.5 py-1 h-7"
//               >
//                 {categoryTitle}
//                 <Button
//                   variant="ghost"
//                   onClick={() => toggleEventCategory(categoryTitle)}
//                   className="ml-1.5 hover:text-destructive transition-colors"
//                   aria-label={`Remove ${categoryTitle}`}
//                 >
//                   <X className="h-3 w-3" />
//                 </Button>
//               </Badge>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HostFilters;