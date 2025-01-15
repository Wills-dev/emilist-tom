import { Modal } from "antd";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  uploadInvoice: any;
  loadInvoice: boolean;
  jobId: string;
  milestoneId: string;
  milestoneAmount: number;
  currency: string;
};

const MilestonInputInvoice = ({
  isOpen,
  onCancel,
  uploadInvoice,
  loadInvoice,
  jobId,
  milestoneId,
  milestoneAmount,
  currency,
}: Props) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={720} footer={null}>
      <form
        className="  px-6 max-sm:px-3 py-10"
        onSubmit={(e) => uploadInvoice(e, jobId, milestoneId)}
      >
        <h2 className="sm:text-lg font-bold mb-4">Milestone Invoice</h2>
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="w-full col-span-2   ">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Amount
            </p>
            <div className="w-full expert-reg-input-div opacity-40 flex-c">
              {currency && currency} {milestoneAmount && milestoneAmount}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          {loadInvoice ? (
            <button className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button type="submit" className="custom-btn">
              Submit
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default MilestonInputInvoice;
