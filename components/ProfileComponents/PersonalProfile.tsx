import Image from "next/image";
import { useContext, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useEditProfile } from "@/hooks/useEditProfile";
import { useAddMembership } from "@/hooks/useAddMembership";

import VerifyModal from "../modals/VerifyModal";
import StarRating from "../StarRating/StarRating";
import AddMembershipModal from "../modals/AddMembershipModal";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const PersonalProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    profileDetails,
    renderInput,
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
  } = useEditProfile();

  const {
    handleChange,
    handleSubmitMember,
    onCancelModal,
    openModal,
    setOpenModal,
    membershipDetails,
    membershipLoading,
  } = useAddMembership();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <LoadingOverlay loading={loading} />
      {load && (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="flex-c-b max-sm:flex-col">
        <div className="">
          <div className="relative w-[109px] h-[109px]  max-sm:w-[90px] max-sm:h-[90px]">
            <Image
              src="/assets/dummyImages/profilePic.png"
              alt="profile picuter"
              width={109}
              height={109}
              className="object-cover w-full h-full min-h-full min-w-full rounded-full"
            />
            <Image
              src="/assets/icons/verify.svg"
              alt="verify icon"
              width={20}
              height={20}
              className="object-contain w-6 h-6 min-h-6 min-w-6 absolute right-0 top-2 max-sm:max-h-5 max-sm:min-h-5 max-sm:max-w-5 max-sm:min-w-5"
            />
            <p className="bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded capitalize absolute -bottom-[0.9rem] left-4 px-4 max-sm:left-2">
              level 3
            </p>
          </div>
          <div className="flex items-center gap-1 my-8">
            <StarRating rating={4} />
          </div>
        </div>

        {/* after adding membership show this*/}

        <button
          className="bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded-lg capitalize  px-10 py-3 max-sm:w-full"
          onClick={showModal}
        >
          Request Verification
        </button>
        <VerifyModal onCancel={onCancel} isOpen={isModalOpen} />
      </div>

      <div className="flex w-full gap-20 mt-8 max-lg:flex-col max-lg:gap-10 text-[#304155]">
        <div className="flex-1 flex-col flex gap-6 w-full">
          <div className="flex-1 flex lg:items-center md:gap-14 gap-10 max-lg:flex-col flex-wrap">
            <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
              <label htmlFor="" className="font-semibold">
                Username
              </label>
              <p className="h-8">{currentUser?.username}</p>
            </div>
            <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
              <div className="flex-c-b">
                <label htmlFor="" className="font-semibold">
                  Unique ID
                </label>{" "}
              </div>
              <p className="h-8">{currentUser?.unique_id}</p>
            </div>

            {[
              { label: "Full Name", field: "name", type: "text" },
              { label: "Email", field: "email", type: "email" },
              { label: "Phone Number1", field: "phonenumber1", type: "number" },
              { label: "Phone Number2", field: "phonenumber2", type: "number" },
              {
                label: "Whatsapp Number",
                field: "whatsappnumber",
                type: "number",
              },
              { label: "Location", field: "location", type: "text" },
              { label: "Gender", field: "gender", type: "text" },
              { label: "Bio", field: "bio", type: "textarea" },
              { label: "Language", field: "language", type: "textarea" },
            ].map((row, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full"
              >
                <div className="flex-c-b">
                  <label htmlFor={row.field} className="font-semibold">
                    {row.label}
                  </label>{" "}
                  {editingField === row.field ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="text-primary-green font-semibold max-sm:text-sm"
                      >
                        Update
                      </button>
                      <button onClick={handleCancel}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleEdit(
                          row.field,
                          (profileDetails as any)[row.field]
                        )
                      }
                      className="text-primary-green font-semibold max-sm:text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {renderInput(
                  row.field,
                  row.type,
                  (profileDetails as any)[row.field]
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full">
        <h2 className="sm:text-lg font-semibold mt-8">Membership</h2>
        {/* before adding membership show this */}
        <button
          className="bg-[#DDFBE9] w-full py-3 rounded-lg font-bold  max-sm:text-sm mt-8"
          onClick={() => setOpenModal(true)}
        >
          Add Membership
        </button>

        <AddMembershipModal
          open={openModal}
          cancel={onCancelModal}
          membershipDetails={membershipDetails}
          membershipLoading={membershipLoading}
          handleChange={handleChange}
          handleSubmitMember={handleSubmitMember}
        />

        {/* after adding membership show this*/}
        {/* <div className="w-full">
        <div className="w-full grid grid-cols-2 gap-20 max-lg:gap-10">
          <div className="col-span-1 max-lg:col-span-2 border-b-[1px] border-[#CBD5E1]">
            <div className="flex justify-between my-8">
              <h5 className="text-[18px] text-[#304155] font-[600]  max-sm:text-[14px]">
                Painters Association of Nigeria
              </h5>
              <button className="text-[16px] text-primary-green font-[600]  max-sm:text-[13px]">
                Edit
              </button>
            </div>
            <div className="flex justify-between flex-wrap gap-3 mb-2">
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Position held:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Member
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Starting Date:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  25/Feb/1998
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  End Date:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Doesnt Expire
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 max-lg:col-span-2 border-b-[1px] border-[#CBD5E1]">
            <div className="flex justify-between my-8">
              <h5 className="text-[18px] text-[#304155] font-[600]  max-sm:text-[14px]">
                National Insueance Association(NIA)
              </h5>
              <button className="text-[16px] text-primary-green font-[600]  max-sm:text-[13px]">
                Edit
              </button>
            </div>
            <div className="flex justify-between flex-wrap gap-3 mb-2">
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Position held:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Member
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Starting Date:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  25/Feb/1998
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#303632]  text-[16px] font-[600]  max-sm:text-[14px] max-sm:leading-[18px]">
                  End Date:
                </p>
                <p className="text-[#303632]  text-[16px] font-[400]  max-sm:text-[14px] max-sm:leading-[18px]">
                  Doesnt Expire
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <li className="flex items-center mt-4">
            {" "}
            <Image
              src="/assets/icons/add.svg"
              alt="add"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 mr-1"
            />{" "}
            <p className="text-primary-green py-2 text-[16px] font-[500] max-sm:text-[14px]">
              ADD MORE
            </p>
          </li>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default PersonalProfile;
