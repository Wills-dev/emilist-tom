import { useInviteUsers } from "@/hooks/useInviteUsers";
import { Modal } from "antd";

interface InviteModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

const InviteModal = ({ isOpen, onCancel }: InviteModalProps) => {
  const { handleInviteUser, isLoading, email, setEmail } = useInviteUsers();

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <form className="pt-8 flex flex-col gap-6 w-full ">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter invitee email..."
          className="expert-reg-input"
          style={{ fontSize: "16px" }}
        />
        <div className="flex-c justify-center">
          {isLoading ? (
            <button type="button" className="load-btn">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              className="custom-btn"
              type="button"
              onClick={async () => {
                await handleInviteUser();
                onCancel();
              }}
            >
              Proceed
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default InviteModal;
