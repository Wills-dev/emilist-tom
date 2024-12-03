import Image from "next/image";

import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

import { toastOptions } from "@/helpers";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

interface FileProps {
  imageUrl: string;
  _id: string;
}

interface EditFormFiveProps {
  businessFile: File[];
  setBusinessFile: any;
  currentBusinessFile: FileProps[];
  businessDescription: string;
  setBusinessDescription: (description: string) => void;
  nextPage: () => void;
  prevPage: () => void;
  handleDeleteFetchedBusinessImage: (
    businessId: string,
    imageId: string
  ) => Promise<void>;
  isLoading: boolean;
  serviceId: string;
}

const EditFormFive = ({
  businessFile,
  setBusinessFile,
  currentBusinessFile,
  nextPage,
  prevPage,
  businessDescription,
  setBusinessDescription,
  handleDeleteFetchedBusinessImage,
  isLoading,
  serviceId,
}: EditFormFiveProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFiles = Array.from(e.target.files || []);
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInMB = 2 * 1024 * 1024; // 2MB

    const filteredFiles = newFiles.filter((file) => {
      if (file.size > maxSizeInMB) {
        toast.error(
          `File ${file.name} exceeds the 3MB size limit.`,
          toastOptions
        );
        return false;
      }
      if (!validExtensions.includes(file.type)) {
        toast.error(
          `Unsupported file type for ${file.name}. Only jpg, jpeg, and png are allowed.`,
          toastOptions
        );
        return false;
      }
      return true;
    });

    setBusinessFile((prevFiles: any) => [...prevFiles, ...filteredFiles]);
  };

  const handleDelete = (index: number) => {
    setBusinessFile((prevFiles: File[]) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleNext = () => {
    if (!businessDescription) {
      return toast.error("Please enter business description", toastOptions);
    } else if (currentBusinessFile?.length < 1 && businessFile?.length < 1) {
      return toast.error("Please enter business image", toastOptions);
    }
    nextPage();
  };
  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <LoadingOverlay loading={isLoading} />
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 px-10 w-full max-md:px-5 max-sm:px-3">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Edit your business description</h1>
            <p className="py-4 max-w-[550px]">
              Supply a brief, vivid description of your service offering here.
            </p>
            <div className="grid grid-cols-5 gap-6 w-full">
              <div className="col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full">
                <textarea
                  className="min-w-full w-full max-w-full rounded-lg p-2 bg-[#ececec] focus:outline-none focus:border-primary-green focus:border-1 max-sm:text-sm"
                  rows={10}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="col-span-5">
                <p className="py-2 max-sm:text-sm font-medium">Add images</p>
                <div className="flex flex-wrap gap-4">
                  {currentBusinessFile?.map((file: FileProps, index) => (
                    <div
                      key={index}
                      className="relative w-[216px] h-[210px] bg-[#ECECEC] rounded-md"
                    >
                      <Image
                        src={file?.imageUrl}
                        alt={`business-picture-${index}`}
                        width={30}
                        height={30}
                        className="object-cover w-full h-full"
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-primary-green p-2"
                        onClick={() =>
                          handleDeleteFetchedBusinessImage(serviceId, file?._id)
                        }
                      >
                        <CgCloseR />
                      </button>
                    </div>
                  ))}
                  {businessFile.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-[216px] h-[210px] bg-[#ECECEC] rounded-md"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`business-picture-${index}`}
                        width={30}
                        height={30}
                        className="object-cover w-full h-full"
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-primary-green p-2"
                        onClick={() => handleDelete(index)}
                      >
                        <CgCloseR />
                      </button>
                    </div>
                  ))}
                  <label
                    htmlFor="business-pic"
                    className="w-[216px] h-[210px] flex justify-center items-center bg-[#ECECEC] rounded-md cursor-pointer border-dashed border-1 border-gray-400"
                  >
                    <input
                      id="business-pic"
                      type="file"
                      onChange={handleChange}
                      name="businessImages"
                      multiple
                      className="hidden"
                    />
                    <span>Add More</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mb-28 mt-6 gap-5 col-span-3 max-lg:col-span-5">
                <button className="custom-btn" onClick={prevPage}>
                  Back
                </button>
                <button className="custom-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFormFive;
