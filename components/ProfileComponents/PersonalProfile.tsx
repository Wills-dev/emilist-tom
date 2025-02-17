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
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
    profileImage,
    handleChangeFile,
    currentImage,
    showSave,
    setProfileDetails,
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
      {load ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex-c-b max-sm:flex-col">
            <div className="">
              <div className="flex gap-4 items-end">
                <div className="relative w-[109px] h-[109px]  max-sm:w-[90px] max-sm:h-[90px] bg-[#F0FDF5] rounded-full border-1">
                  <Image
                    src={
                      currentImage
                        ? currentImage
                        : "/assets/images/user-profile.svg"
                    }
                    alt="profile picture"
                    width={109}
                    height={109}
                    className="object-cover w-full h-full min-h-full min-w-full rounded-full"
                  />
                  <input
                    style={{ fontSize: "16px" }}
                    type="file"
                    name="image"
                    id="profileImage"
                    onChange={handleChangeFile}
                    className="h-0 w-0 invisible"
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
                {profileImage?.name && showSave ? (
                  <button
                    onClick={handleUpdate}
                    type="button"
                    className="text-white bg-primary-green rounded-full px-4 py-1"
                  >
                    Save
                  </button>
                ) : (
                  <label
                    htmlFor="profileImage"
                    className="border-1 border-primary-green rounded-full px-4 py-1 cursor-pointer"
                  >
                    Change profile
                  </label>
                )}
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

          <div className="flex-c justify-end py-4">
            <button className="custom-btn" onClick={handleEdit}>
              Edit profile
            </button>
          </div>

          <div className="flex w-full gap-20 mt-8 max-lg:flex-col max-lg:gap-10 text-[#304155]">
            <div className="flex-1 flex-col flex gap-6 w-full">
              <div className="flex-1 flex lg:items-center md:gap-14 gap-10 max-lg:flex-col flex-wrap">
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <label htmlFor="" className="font-semibold">
                    Username
                  </label>
                  <p className="h-8">{currentUser?.userName}</p>
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Unique ID
                    </label>{" "}
                  </div>
                  <p className="h-8">{currentUser?.uniqueId}</p>
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Email
                    </label>{" "}
                  </div>
                  <p className="h-8">{currentUser?.email}</p>
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Full Name
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={profileDetails.fullName}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          fullName: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.fullName ? profileDetails?.fullName : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Phone Number1
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="number"
                      name="number1"
                      id="number1"
                      value={profileDetails.number1}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          number1: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.number1 ? profileDetails?.number1 : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Phone Number2
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="number"
                      name="number2"
                      id="number2"
                      value={profileDetails?.number2}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          number2: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.number2 ? profileDetails?.number2 : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Whatsapp Number
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="number"
                      name="whatsAppNo"
                      id="whatsAppNo"
                      value={profileDetails?.whatsAppNo}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          whatsAppNo: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.whatsAppNo
                        ? profileDetails?.whatsAppNo
                        : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Location
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      name="location"
                      id="location"
                      value={profileDetails.location}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          location: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.location ? profileDetails?.location : ""}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Gender
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      name="gender"
                      id="gender"
                      value={profileDetails.gender}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          gender: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.gender ? profileDetails?.gender : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Bio
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <textarea
                      name="bio"
                      id="bio"
                      value={profileDetails?.bio}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          bio: e.target.value,
                        })
                      }
                      style={{ fontSize: "16px" }}
                      className="outline-none  border-b-1 border-green-300 px-2 bg-green-50"
                    ></textarea>
                  ) : (
                    <p className="h-8">
                      {profileDetails?.bio && profileDetails?.bio}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 border-b-1 border-[#CBD5E1] focus-within:border-primary-green lg:w-[47%] w-full">
                  <div className="flex-c-b">
                    <label htmlFor="" className="font-semibold">
                      Language
                    </label>{" "}
                  </div>
                  {editingField ? (
                    <input
                      style={{ fontSize: "16px" }}
                      type="text"
                      name="language"
                      id="language"
                      value={profileDetails.language}
                      onChange={(e) =>
                        setProfileDetails({
                          ...profileDetails,
                          language: e.target.value,
                        })
                      }
                      className="outline-none h-8 border-b-1 border-green-300 w-full  px-2 bg-green-50"
                    />
                  ) : (
                    <p className="h-8">
                      {profileDetails?.language && profileDetails?.language}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-10 w-full py-8">
            {editingField ? (
              <>
                <button className="custom-btn flex-1" onClick={handleUpdate}>
                  Save changes
                </button>
                <button
                  className="bg-slate-200 text-primary-green whitespace-nowrap transition-all duration-300 rounded-lg px-6 py-3 text-center flex-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="custom-btn flex-1" onClick={handleEdit}>
                Edit profile
              </button>
            )}
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
        </>
      )}
    </div>
  );
};

export default PersonalProfile;
