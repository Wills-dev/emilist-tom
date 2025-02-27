import toast from "react-hot-toast";

const toastOptions = {
  duration: 6000,
  style: {
    background: "#353434",
    color: "#fff",
  },
};

export const formatPercentageInput = (inputValue: string) => {
  // Remove non-numeric characters
  if (!/^\d*$/.test(inputValue)) return;

  let numericValue = Number(inputValue);

  // Ensure the value does not exceed 100
  if (numericValue > 100) {
    toast.error("Percentage can't exceed 100", toastOptions);
    return;
  }

  return inputValue;
};
