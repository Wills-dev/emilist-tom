import React, { ChangeEvent } from "react";

interface RecurringScheduleProps {
  loading: boolean;
  plannedMaintenance: any;
  setPlannedMaintenance: any;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const RecurringSchedule = ({
  loading,
  plannedMaintenance,
  setPlannedMaintenance,
  handleChange,
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
                name="maintenanceFrequency"
                value={plannedMaintenance.maintenanceFrequency}
                onChange={(e) =>
                  setPlannedMaintenance({
                    ...plannedMaintenance,
                    maintenanceFrequency: e.target.value,
                  })
                }
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
        <div className="w-full">
          <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
            How many times “what is selected above”
          </p>
          <div className="w-full">
            <input
              style={{ fontSize: "16px" }}
              type="text"
              className="expert-reg-input"
              name="numberOfTimes"
              value={plannedMaintenance.numberOfTimes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0"></div>
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
