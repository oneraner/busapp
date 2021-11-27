import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const PlanTable = () => {
  const router = useRouter();
  const [currentSaveStop, setCurrentSaveStop] = useState([]);
  const [time, setTime] = useState(0);
  const [refreshTime, setRefreshTime] = useState(60);
  const plan = useSelector(state => state.plan) ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!localStorage.getItem("station")) {
      setCurrentSaveStop(JSON.parse(localStorage.getItem("station")));
    }
  }, [router.pathname]);

  useEffect(() => {
    if (currentSaveStop.length > 0) {
      refreshData(currentSaveStop);
    }
  }, [currentSaveStop, refreshData]);

  useEffect(() => {
    if (plan.length > 0) {
      const isRefresh = time > refreshTime;
      const timeId = setInterval(
        () =>
          isRefresh
            ? (refreshData(currentSaveStop), setTime(0))
            : setTime(time + 1),
        1000
      );

      return () => clearInterval(timeId);
    }
  }, [plan, time, currentSaveStop, refreshData, refreshTime]);

  const refreshData = list => {
    list.map(data =>
      dispatch({
        type: "FETCH_EstimateTime_DATA",
        routeData: {
          route: data.routerName,
          stationID: data.stationID,
          city: data.city,
        },
      })
    );
  };

  const handleCountDown = ({ status, estimateTime }) => {
    if (!estimateTime) {
      switch (status) {
        case 1:
          return "尚未發車";
        case 2:
          return "交管不停靠";
        case 3:
          return "末班車已過";
        default:
          return "今日未營運";
      }
    }
    const secTime = Number(estimateTime) - time;
    const minTime = Math.floor(secTime / 60);
    const secondsRemaining = Math.floor(secTime % 60);
    if (secTime < 0) {
      refreshData(currentSaveStop);
      setTime(0);
    }
    return `${minTime} 分 ${secondsRemaining} 秒`;
  };

  const deletePlan = index => {
    const tempArray = [...currentSaveStop];
    tempArray.splice(index, 1);
    localStorage.setItem("station", JSON.stringify(tempArray));
    setCurrentSaveStop(tempArray);
  };

  return (
    <div className="min-h-c-screen relative">
      <div className=" text-c-primary font-semibold p-2 mb-2">
        目前追蹤的路線
      </div>
      {plan.map((data, index) => (
        <ul
          className=" bg-c-white rounded-lg px-4 py-2 mx-3 mb-2"
          key={data.StopID}
        >
          <li className="flex justify-between">
            <p>{data.RouteName.Zh_tw}</p>
            <p>
              {handleCountDown({
                status: data.StopStatus,
                estimateTime: data.EstimateTime,
              })}
            </p>
            {/* <p onClick={() => deletePlan(index)}>刪除</p> */}
          </li>
          <li className="flex justify-between">
            <p>{data.StopName.Zh_tw}</p>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default PlanTable;
