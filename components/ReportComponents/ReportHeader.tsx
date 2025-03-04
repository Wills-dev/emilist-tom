"use client";

import { reportLinks } from "@/constants";

interface ReportHeaderProps {
  currentLink: string;
  setCurrentLink: (link: string) => void;
}

const ReportHeader = ({ currentLink, setCurrentLink }: ReportHeaderProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold max-sm:text-lg pt-6">Report</h2>
      <div className="my-4">
        <h6 className="text-[#5E625F] font-medium max-sm:text-sm">
          Select the report you want to see
        </h6>
        <div className="flex-c gap-4 my-5 flex-wrap">
          <ul className="flex-c gap-4 overflow-x-auto hide-scrollbar">
            {reportLinks?.map((link) => (
              <li
                key={link?.name}
                className={`cursor-pointer ${
                  currentLink === link.name
                    ? "text-primary-green  border-b-primary-green border-b-1"
                    : "text-[#737774]"
                }  font-semibold capitalize`}
                onClick={() => setCurrentLink(link?.name)}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
