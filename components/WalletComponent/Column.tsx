import Link from "next/link";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columnHelper = createColumnHelper();

export const Column = [
  columnHelper.accessor("date", {
    header: "Date",
  }),
  columnHelper.accessor("virtualCard", {
    header: "Transaction name",
  }),
  columnHelper.accessor("user", {
    header: "Full name",
  }),
  columnHelper.accessor("cable", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const state = row.getValue("cable");
      if (state === "Credit") {
        return <div className=" text-green-400">{state}</div>;
      } else if (state === "Debit") {
        return <div className=" text-red-400">{state}</div>;
      }
    },
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "completed") {
        return (
          <div className="rounded-full text-green-400 bg-green-50 px-3 py-1 text-center w-32">
            {status}
          </div>
        );
      } else if (status === "cancelled") {
        return (
          <div className="rounded-full text-red-400 bg-red-50 px-3 py-1 text-center w-32">
            {status}
          </div>
        );
      }
    },
  }),

  // {
  //   id: "actions",
  //   cell: ({ row }: any) => {
  //     const cable = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0 text-right">
  //             {/* <span className="sr-only">Open menu</span> */}
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuItem>
  //             <Link href={`/cable/info/${cable.id}`}>View details</Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
