import React from "react";

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  if (!loading) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-60 bg-white z-50"></div>
  );
};

export default LoadingOverlay;
