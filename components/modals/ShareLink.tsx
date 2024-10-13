import { Modal } from "antd";

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
}

const ShareLink = ({
  isModalOpen,
  handleCancel,
  link,
  textToCopy,
  title,
}: ShareLinkProps) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="py-4 share-referral">
        <EmailShareButton url={link} title={textToCopy}>
          <button> Share on</button>
          <EmailIcon />
        </EmailShareButton>

        <FacebookShareButton url={link} title={textToCopy}>
          <button> Share on </button>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={link} title={textToCopy}>
          <button> Share on</button>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton url={link} title={textToCopy}>
          <button>Share on</button>
          <WhatsappIcon />
        </WhatsappShareButton>
        <LinkedinShareButton url={link} title={textToCopy}>
          <button>Share on</button>
          <LinkedinIcon />
        </LinkedinShareButton>
      </div>
    </Modal>
  );
};

export default ShareLink;
