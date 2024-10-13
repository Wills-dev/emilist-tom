import Link from "next/link";
import Image from "next/image";

import { ChartConfig } from "../ui/chart";
import { RadialChart } from "../Charts/RadialChart";

const TargetInfo = () => {
  const chartData = [{ target: "target", percentage: 80, fill: "#6667FF" }];

  const chartConfig = {
    percentage: {
      label: "Percentage",
    },
    target: {
      label: "target",
      color: "#6667FF",
    },
  } satisfies ChartConfig;

  return (
    <section className="py-28 padding-x">
      <h1 className="sm:text-3xl font-bold text-xl py-4">
        Your monthly target
      </h1>
      <div className="flex justify-end">
        <Link
          href="/dashboard/service/target/edit"
          className="flex items-center"
        >
          <Image
            src="/assets/icons/edit.svg"
            alt="logo"
            width={20}
            height={20}
            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-2"
          />
          <p className="text-primary-green max-sm:text-sm">Edit</p>
        </Link>{" "}
      </div>
      <div className="flex items-center overflow-x-scroll w-full py-4 gap-6">
        <div className=" w-[294px] min-w-[254px] p-4 flex flex-col gap-3 rounded-lg shadow-md">
          <h6 className="text-lg font-medium max-sm:text-sm">Jobs</h6>
          <p className="text-[16px] text-[#303632]  max-sm:text-sm">
            Amet minim mollit non deserunt ullamco est sit .{" "}
          </p>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
              12/20
            </p>
            <progress
              className="progress w-full "
              value="57"
              max="100"
            ></progress>
          </div>
        </div>
        <div className=" w-[294px] min-w-[254px] p-4 flex flex-col gap-3 rounded-lg shadow-md">
          <h6 className="text-lg font-medium max-sm:text-sm">Amount</h6>
          <p className="text-[16px] text-[#303632]  max-sm:text-sm">
            Amet minim mollit non deserunt ullamco est sit .{" "}
          </p>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
              #200,000/#300,000
            </p>
            <progress
              className="progress progress-success w-full"
              value="40"
              max="100"
            ></progress>
          </div>
        </div>
        <div className=" w-[294px] min-w-[254px] p-4 flex flex-col gap-3 rounded-lg shadow-md">
          <h6 className="text-lg font-medium max-sm:text-sm">
            Customer Referral
          </h6>
          <p className="text-[16px] text-[#303632]  max-sm:text-sm">
            Amet minim mollit non deserunt ullamco est sit .{" "}
          </p>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
              20/35
            </p>
            <progress
              className="progress progress-warning w-full "
              value="40"
              max="100"
            ></progress>
          </div>
        </div>
        <div className=" w-[294px] min-w-[254px] p-4 flex flex-col gap-3 rounded-lg shadow-md">
          <h6 className="text-lg font-medium max-sm:text-sm">
            Friends Invited
          </h6>
          <p className="text-[16px] text-[#303632]  max-sm:text-sm">
            Amet minim mollit non deserunt ullamco est sit .{" "}
          </p>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xl text-[#737774] font-semibold max-sm:text-sm">
              35/35
            </p>
            <progress
              className="progress progress-error w-full"
              value="100"
              max="100"
            ></progress>
          </div>
        </div>
      </div>
      <div className="w-full flex-c justify-center py-10 flex-col">
        {/* <h1 className="text-3xl font-bold  max-sm:text-xl py-4">
          Total Target Percentage
        </h1> */}
        {/* <div className="w-[280px] h-[280px] rounded-full border-[1.5rem] border-[#D9D9D9] flex-c justify-center border-b-[#6667FF] border-l-[#6667FF]">
          <h1 className="sm:text-3xl font-bold text-xl py-4">57%</h1>
        </div> */}

        <RadialChart chartData={chartData} chartConfig={chartConfig} />
      </div>
    </section>
  );
};

export default TargetInfo;
