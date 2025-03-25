import Image from "next/image";
import React, { ChangeEvent } from "react";

interface RecurringScheduleProps {
  loading: boolean;
  handleStartDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeReminder: (index: number) => void;
  addReminder: () => void;
  handleReminderChange: (index: number, value: number) => void;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  reminders: number[];
  frequency: string;
  setFrequency: React.Dispatch<React.SetStateAction<string>>;
}

const RecurringSchedule = ({
  loading,
  handleStartDateChange,
  removeReminder,
  addReminder,
  handleReminderChange,
  endDate,
  setEndDate,
  startDate,
  reminders,
  frequency,
  setFrequency,
}: RecurringScheduleProps) => {
  return (
    <div className="grid grid-cols-2 w-full gap-10 mt-4  ">
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Maintenance frequency
          </p>
          <div className="w-full">
            <div className="expert-reg-input-div">
              <select
                style={{ fontSize: "16px" }}
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option defaultValue="">Select frequency</option>

                <option value="Weekly" className="capitalize">
                  Weekly
                </option>
                <option value="Monthly" className="capitalize">
                  Monthly
                </option>
                <option value="Quarterly" className="capitalize">
                  Quarterly
                </option>
                <option value="Yearly" className="capitalize">
                  Yearly
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-full flex-1">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              Start date
            </p>
            <div className="w-full">
              <input
                style={{ fontSize: "16px" }}
                className="expert-reg-input"
                name="startDate"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
              End date
            </p>
            <div className="w-full">
              <input
                style={{ fontSize: "16px" }}
                className="expert-reg-input"
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                disabled={!startDate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <div className="w-full space-y-2">
          <p className="text-[#5e625f]  font-medium max-sm:text-sm">Reminder</p>
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="expert-reg-input-div">
                <select
                  style={{ fontSize: "16px" }}
                  className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full max-sm:text-sm"
                  name="milestonesnumber"
                  value={reminder}
                  onChange={(e) =>
                    handleReminderChange(index, Number(e.target.value))
                  }
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <option
                      key={num}
                      value={num}
                      disabled={reminders.includes(num)}
                    >
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeReminder(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
          {reminders.length < 3 && (
            <button
              onClick={addReminder}
              className=" flex items-center text-primary-green py-2 text-base font-[500] max-sm:text-sm cursor-pointer max-w-fit"
            >
              <Image
                src="/assets/icons/add.svg"
                alt="logo"
                width={130}
                height={30}
                className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] mr-1"
              />
              Add More
            </button>
          )}
        </div>
      </div>
      <div className="flex mb-28 mt-6 justify-center col-span-2 ">
        {loading ? (
          <button type="button" className="load-btn">
            {" "}
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button type="submit" className="custom-btn">
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default RecurringSchedule;
