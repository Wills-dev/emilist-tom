import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  question: string;
  onCancel: () => void;
  removeApplicant: any;
  applicantId: string;
  jobId: string;
};

const ConfirmRemoveModal = ({
  isOpen,
  question,
  onCancel,
  removeApplicant,
  applicantId,
  jobId,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <div className="flex flex-col items-center justify-center py-8 px-6 max-sm:px-3">
        <h6 className="text-center text-[#030A05] max-sm:text-[14px]">
          {question}
        </h6>
        <div className="flex items-center mt-6 gap-4">
          <button
            className="bg-primary-green rounded-lg text-white py-2 px-3 hover:bg-green-600 transition-all duration-300"
            onClick={() => removeApplicant(applicantId, jobId)}
          >
            yes
          </button>
          <button
            className="bg-red-500 rounded-lg text-white py-2 px-3 hover:bg-red-600 transition-all duration-300"
            onClick={onCancel}
          >
            no
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmRemoveModal;
