import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";

import { convertDateFormat, numberWithCommas } from "@/helpers";
import { useContext } from "react";
import { AuthContext } from "@/utils/AuthState";
import { getCurrencySign } from "@/helpers/getCurrencySign";

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
      const formatted = date ? convertDateFormat(date) : "";
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
      const artisanId: any = (row?.original as any)?.recieverId;
      const transactionType: any = (row?.original as any)?.serviceType;
      const { currentUser } = useContext(AuthContext);
      const userId = currentUser?._id;
      if (userId === artisanId && transactionType === "Job") {
        return <div className=" text-center text-green-400">CREDIT</div>;
      } else if (state === "CREDIT") {
        return (
          <div className="text-center text-green-400">{state && state}</div>
        );
      } else if (state === "DEBIT") {
        return (
          <div className=" text-center text-red-400">{state && state}</div>
        );
      }
    },
  }),
  columnHelper.accessor("serviceType", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type: any = row.getValue("serviceType");
      return <div className="font-medium text-center">{type && type}</div>;
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
      const currency: any = (row?.original as any)?.currency;
      const currencySign = currency ? getCurrencySign(currency) : "";
      const formatted = numberWithCommas(amount);
      return (
        <div className="font-medium text-center">
          {currencySign && currencySign}
          {formatted && formatted}
        </div>
      );
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
      const status = row.getValue("status") as string;
      const artisanId = (row?.original as any)?.recieverId;
      const transactionType = (row?.original as any)?.serviceType;
      const { currentUser } = useContext(AuthContext);
      const userId = currentUser?._id;

      const statusStyles: Record<string, string> = {
        completed: "text-green-400 bg-green-50",
        pending: "text-yellow-400 bg-yellow-50",
        processing:
          transactionType === "Job" && userId !== artisanId
            ? "text-green-400 bg-green-50"
            : "text-blue-400 bg-blue-50",
      };
      console.log("status", status);
      const displayText =
        status === "processing" &&
        transactionType === "Job" &&
        userId !== artisanId
          ? "completed"
          : status || "pending";

      return (
        <div
          className={`rounded-full px-3 py-1 text-center w-32 ${
            statusStyles[status] || "text-yellow-400 bg-yellow-50"
          }`}
        >
          {displayText}
        </div>
      );
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
