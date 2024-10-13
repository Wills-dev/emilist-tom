import { Dispatch, SetStateAction } from "react";

import QuoteModal from "../modals/QuoteModal";

interface AddQouteProps {
  jobInfo: any;
  getJobInfo: any;
  showQuoteComponent: boolean;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AddQoute = ({
  jobInfo,
  getJobInfo,
  openModal,
  setOpenModal,
  showQuoteComponent,
}: AddQouteProps) => {
  return (
    <>
      {" "}
      {showQuoteComponent && (
        <div className="col-span-12 ">
          <div className="flex-c-b bg-[#DDFBE9] border-primary-green border-1 px-[3rem] py-2 rounded-lg max-sm:flex-col max-md:px-[1rem] max-sm:px-[0.5rem]  gap-2 text-center w-full">
            {" "}
            <p className=" max-sm:text-xs">
              The Job Posted requested for a quote
            </p>{" "}
            <button
              className="bg-primary-green px-[18px] py-[5px] text-[#f6fdf9] rounded cursor-pointer whitespace-nowrap max-sm:text-xs"
              onClick={() => setOpenModal(true)}
            >
              Add Quote
            </button>
            {/* quote modal */}
            <QuoteModal
              isOpen={openModal}
              onCancel={() => setOpenModal(false)}
              jobInfo={jobInfo}
              getJobInfo={getJobInfo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddQoute;
