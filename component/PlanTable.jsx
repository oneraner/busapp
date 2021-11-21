import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// const stopData = async ({ routerName, stationID }) => {
//   const data = await axios
//     .get(
//       `http://localhost:3000/api/estimatedTimeOfArrival?stationID=${stationID}`
//     )
//     .then(response => response);
//   const handleData = data?.data?.data.find(stopData => {
//     return stopData.RouteName.Zh_tw === routerName;
//   });
//   return handleData;
// };

// const serverSideFetch = async list => {
//   const allList = await Promise.all(
//     list.map(
//       async item =>
//         await stopData({
//           routerName: item.routerName,
//           stationID: item.stationID,
//         })
//     )
//   );
//   console.log("allList", allList);
// };

export const PlanTable = props => {
  const [currentSaveStop, setCurrentSaveStop] = useState([]);
  const [time, setTime] = useState(0);
  const [refreshTime, setRefreshTime] = useState(60);
  const plan = useSelector(state => state.plan);
  const dispatch = useDispatch();
  console.log("plan", plan);

  useEffect(() => {
    if (!!localStorage.getItem("station")) {
      setCurrentSaveStop(JSON.parse(localStorage.getItem("station")));
    }
  }, []);

  useEffect(() => {
    if (currentSaveStop.length > 0) {
      refreshData(currentSaveStop);
    }
  }, [currentSaveStop]);

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
  }, [plan, time, currentSaveStop]);

  const refreshData = list => {
    list.map(data =>
      dispatch({
        type: "FETCH_EstimateTime_DATA",
        routeData: {
          route: data.routerName,
          stationID: data.stationID,
        },
      })
    );
  };

  const handleCountDown = EstimateTime => {
    if (!EstimateTime) {
      return "未營運";
    }
    const secTime = Number(EstimateTime) - time;
    const minTime = Math.floor(secTime / 60);
    const secondsRemaining = Math.floor(secTime % 60);
    if (secTime < 0) {
      refreshData(currentSaveStop);
      setTime(0);
    }
    return `${minTime} 分 ${secondsRemaining} 秒`;
  };

  return (
    <div className="min-h-screen relative">
      <div>目前追蹤的路線</div>
      {plan.map(data => (
        <React.Fragment key={data.StopID}>
          <div>{data.RouteName.Zh_tw}</div>
          <div>{data.StopName.Zh_tw}</div>
          <div>{handleCountDown(data.EstimateTime)}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PlanTable;
