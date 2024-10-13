import Image from "next/image";
import { useState } from "react";

import { Modal } from "antd";

import { MembershipProps } from "@/types";

interface AddMembershipProps {
  open: boolean;
  cancel: any;
  membershipDetails: MembershipProps;
  membershipLoading: boolean;
  handleChange: any;
  handleSubmitMember: (e: any) => void;
}

const AddMembershipModal = ({
  open,
  cancel,
  handleChange,
  handleSubmitMember,
  membershipDetails,
  membershipLoading,
}: AddMembershipProps) => {
  const [isEndChecked, setIsEndChecked] = useState(false);

  return (
    <Modal open={open} onCancel={cancel} centered width={550} footer={null}>
      <h5 className="font-bold text-2xl py-4">Add Membership</h5>
      <form
        action=""
        className="flex flex-col gap-3 w-full pb-5 pt-2 px-3"
        onSubmit={(e) => handleSubmitMember(e)}
      >
        <div className="input__container ">
          <p className="input-label">Organization</p>
          <div className="w-full">
            <input
              type="text"
              className="expert-reg-input"
              placeholder=" "
              name="organization"
              value={membershipDetails.organization}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input__container ">
          <p className="input-label">Position</p>
          <div className="w-full">
            <div className=" expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-[14px] "
                value={membershipDetails.position}
                onChange={handleChange}
                name="position"
              >
                <option value="Member">Member</option>
                <option value="President">President</option>
                <option value="Chairman">Chairman</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full col-span-2  max-lg:col-span-4">
          <p className="input-label">State Date</p>
          <div className="w-full">
            <input
              type="date"
              className="expert-reg-input"
              placeholder="12345678990"
              name="startDate"
              value={membershipDetails.startDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full col-span-2  max-lg:col-span-4   ">
          <p className="input-label">End Date</p>
          <div className="w-full">
            <input
              type="date"
              className="expert-reg-input"
              placeholder="12345678990"
              name="endDate"
              value={membershipDetails.endDate}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex w-full items-center py-2 gap-2"
            onClick={() => setIsEndChecked((prev) => !prev)}
          >
            <Image
              src={
                isEndChecked
                  ? "/assets/icons/checkbox-filled.svg"
                  : "/assets/icons/checkbox.svg"
              }
              alt="arrow-left"
              width={30}
              height={30}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
            />
            <label className="input-label cursor-pointer">No end date</label>
          </div>
        </div>
        {membershipLoading ? (
          <button className="load-btn">
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button className="custom-btn" type="submit">
            Add
          </button>
        )}
      </form>
    </Modal>
  );
};

export default AddMembershipModal;
