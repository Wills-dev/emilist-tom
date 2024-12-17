import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";

import { convertDateFormat, numberWithCommas } from "@/helpers";

const columnHelper = createColumnHelper();

export const Column = [
  columnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const formatted = convertDateFormat(date);
      return <div className="">{formatted}</div>;
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("type", {
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
      const state = row.getValue("type");
      if (state === "CREDIT") {
        return <div className=" text-green-400">{state}</div>;
      } else if (state === "DEBIT") {
        return <div className=" text-red-400">{state}</div>;
      }
    },
  }),
  columnHelper.accessor("currency", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Currency
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = numberWithCommas(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  }),

  columnHelper.accessor("balanceAfter", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance After
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balanceAfter"));
      const formatted = numberWithCommas(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "completed") {
        return (
          <div className="rounded-full text-green-400 bg-green-50 px-3 py-1 text-center w-32">
            {status}
          </div>
        );
      } else if (status === "pending") {
        return (
          <div className="rounded-full text-yellow-400 bg-yellow-50 px-3 py-1 text-center w-32">
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
