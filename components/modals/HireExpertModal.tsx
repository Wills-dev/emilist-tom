import Image from "next/image";

import { Modal } from "antd";
import { CgCloseR } from "react-icons/cg";

import { HiringDetails } from "@/types";

interface HireExpertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleSubmit: () => void;
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
  handleChnage: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  loading: boolean;
  hiringDetails: HiringDetails;
  selectedImage: any;
  handleDelete: () => void;
}

const HireExpertModal = ({
  isOpen,
  onCancel,
  handleSubmit,
  handleFileChange,
  handleChnage,
  loading,
  hiringDetails,
  selectedImage,
  handleDelete,
}: HireExpertModalProps) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={650} footer={null}>
      <div className="  px-6 max-sm:px-3 py-10">
        <h2 className="sm:text-xl font-bold  mb-4 capitalize">
          Fill the form below
        </h2>
        <div className="grid grid-cols-2 w-full gap-4">
          <div className="w-full col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Your full name
            </p>
            <input
              type="text"
              className="expert-reg-input"
              name="fullName"
              value={hiringDetails.fullName}
              onChange={handleChnage}
            />
          </div>
          <div className="w-full  col-span-2">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Select Job you want to hire a supervisor for
            </p>
            <div className="w-full">
              <div className=" min-w-full w-full  max-w-full rounded-lg h-14 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1  max-sm:h-12">
                <select
                  className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full max-sm:text-sm "
                  name="jobType"
                  value={hiringDetails?.jobType}
                  onChange={handleChnage}
                >
                  <option defaultValue="">Select payment type</option>
                  <option value="Paypal">Paypal</option>
                  <option value="Flutterwave">Flutterwave</option>
                  <option value="Venmo">Venmo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full  col-span-2 ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Give details if its a new project that you've not added to Emilist
            </p>
            <div className="w-full">
              <textarea
                className=" min-w-full w-full  max-w-full rounded-lg  p-2 bg-[rgb(236,236,236)] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm text-[#737774]"
                rows={8}
                name="jobDetails"
                value={hiringDetails?.jobDetails}
                onChange={handleChnage}
              ></textarea>
            </div>
          </div>

          {selectedImage ? (
            <div className="w-[100px] h-[100px] relative">
              {selectedImage && (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="upload"
                  width={30}
                  height={30}
                  className="object-cover w-full h-full"
                />
              )}
              <button className="absolute bottom-0 right-0 bg-primary-green p-2">
                <span className="" onClick={handleDelete}>
                  <CgCloseR />
                </span>
              </button>
            </div>
          ) : (
            <div className="">
              <label htmlFor="file" className=" flex items-center ">
                <Image
                  src="/assets/icons/add.svg"
                  alt="logo"
                  width={130}
                  height={30}
                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-6 mr-1"
                />{" "}
                <p className="text-primary-green py-2 font-medium max-sm:text-sm">
                  ADD FILE
                </p>
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                name="file"
                className="invisible h-0 w-0"
              />
            </div>
          )}

          <div className="w-full col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Location
            </p>
            <div className="w-full">
              <input
                type="text"
                className=" expert-reg-input"
                placeholder="Lagos, Nigeria"
                name="location"
                value={hiringDetails?.location}
                onChange={handleChnage}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          {loading ? (
            <button className="load-btn mt-3">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button className="custom-btn" onClick={handleSubmit}>
              send
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HireExpertModal;
