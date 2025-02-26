import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  maxLength: number;
  style?: string;
}

const ReadMore = ({ text, maxLength, style }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text?.length > maxLength;

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <p className={style}>
      {" "}
      {shouldTruncate && !isExpanded ? `${text.slice(0, maxLength)}...` : text}
      {text.length > maxLength && (
        <button
          onClick={toggleReadMore}
          className="underline text-primary-green text-xs"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </p>
  );
};

export default ReadMore;
