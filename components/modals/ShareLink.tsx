import { useAddClicks } from "@/hooks/useAddClicks";
import { AuthContext } from "@/utils/AuthState";
import { Modal } from "antd";
import { useContext } from "react";

import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

interface ShareLinkProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  link: string;
  textToCopy: string;
  title: string;
  id?: string;
}

const ShareLink = ({
  isModalOpen,
  handleCancel,
  link,
  textToCopy,
  title,
  id,
}: ShareLinkProps) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="py-4 share-referral">
        <EmailShareButton url={link} title={textToCopy}>
          <span onClick={() => addClicks("shared", id || "", userId || null)}>
            {" "}
            Share on
          </span>
          <EmailIcon />
        </EmailShareButton>

        <FacebookShareButton url={link} title={textToCopy}>
          <span onClick={() => addClicks("shared", id || "", userId || null)}>
            {" "}
            Share on{" "}
          </span>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={link} title={textToCopy}>
          <span onClick={() => addClicks("shared", id || "", userId || null)}>
            {" "}
            Share on
          </span>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton url={link} title={textToCopy}>
          <span onClick={() => addClicks("shared", id || "", userId || null)}>
            Share on
          </span>
          <WhatsappIcon />
        </WhatsappShareButton>
        <LinkedinShareButton url={link} title={textToCopy}>
          <span onClick={() => addClicks("shared", id || "", userId || null)}>
            Share on
          </span>
          <LinkedinIcon />
        </LinkedinShareButton>
      </div>
    </Modal>
  );
};

export default ShareLink;
