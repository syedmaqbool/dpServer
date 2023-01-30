import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { BookSlotDTO } from "../../interfaces/DashboardInterface";
import { removeSelectedSlot } from "../../redux/dashboardSlice";
import { RootState } from "../../redux/store";
import { bookSlot } from "../../services/DashboardService";

// {
//   "lot_id":1,
//   "slot_id":3,
//   "user_id":1,
//   "timeIn":"10:00",
//   "timeOut":"10:20",
//   "bookingDate":"2022-03-25"
// }

function DashboardBookParking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSlot } = useSelector((state: RootState) => state.dashboard);
  const { user } = useSelector((state: RootState) => state.auth);
  const [areaId, setAreaId] = useState<number>(0);
  const [slotId, setSlotId] = useState<number>(0);
  const [toDate, setToDate] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);

  const handleBookSlot = async () => {
    const bookSlotDTO: BookSlotDTO = {
      lot_id: areaId,
      slot_id: slotId,
      bookingDate: getBookingDate(),
      user_id: user?.id || 0,
      timeIn: fromDate.toString().substr(16, 5),
      timeOut: toDate.toString().substr(16, 5),
    };
    const result = await bookSlot(bookSlotDTO);
    if (result && result.status === 200) {
      navigate("/dashboard/view-parking");
      dispatch(removeSelectedSlot());
    }
  };

  useEffect(() => {
    setAreaId(selectedSlot?.parkingarea_id || 0);
    setSlotId(selectedSlot?.id || 0);
  }, [selectedSlot]);

  const handleToDateChange = (e: any) => {
    if (!e.isValid) return;
    setToDate(e);
  };
  const handleFromDateChange = (e: any) => {
    if (!e.isValid) return;
    setFromDate(e);
  };

  return (
    <div className="h-[35rem] rounded">
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-4 rounded bg-white p-4 py-32">
        <div className="">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="area"
          >
            Area
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
            id="area"
            type="number"
            value={areaId}
            onChange={(e) => setAreaId(+e.target.value)}
            placeholder="Enter Area"
          />
        </div>
        <div className="">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="spot"
          >
            Spot
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
            id="spot"
            type="number"
            value={slotId}
            onChange={(e) => setSlotId(+e.target.value)}
            placeholder="Enter Spot"
          />
        </div>
        <div className="">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="time-from"
          >
            Time From
          </label>
          <Datetime
            dateFormat={false}
            inputProps={{ id: "time-from" }}
            initialViewMode="time"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div className="">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="time-to"
          >
            Time To
          </label>
          <Datetime
            initialViewMode="time"
            dateFormat={false}
            inputProps={{ id: "time-to" }}
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            onClick={handleBookSlot}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
          >
            Book Parking
          </button>
        </div>
      </div>
    </div>
  );
}

function getBookingDate() {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  function addZero(value: number) {
    if (value < 9) {
      return "0" + value;
    }
    return value.toString();
  }
  return `${year}-${addZero(month + 1)}-${addZero(date)}`;
}

export default DashboardBookParking;
