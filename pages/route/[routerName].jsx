import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

const Route = props => {
  const router = useRouter();
  const { routeUid, routerName, city } = router.query;
  const [roundTrip, setRoundTrip] = useState(true);
  const deaprtureData =
    busRouteData.length > 0
      ? busRouteData.find(data => data?.Direction === 0)
      : [];
  const returnData =
    busRouteData.length > 0
      ? busRouteData.find(data => data?.Direction === 1)
      : [];
  const [currentSaveStop, setCurrentSaveStop] = useState([]);

  const busRouteData = useSelector(state => state.busRouteData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_BUS_ROUTE_DATA",
      routeData: { routeUid, routerName, city },
    });
    if (!!localStorage.getItem("station")) {
      setCurrentSaveStop(JSON.parse(localStorage.getItem("station")));
    }
  }, [routeUid, routerName, city]);

  useEffect(() => {
    if (!!routerName && !!routeUid) {
      dispatch({
        type: "FETCH_BUS_ROUTE_DATA",
        routeData: { routeUid, routerName, city },
      });
    }
  }, [routerName, routeUid, city]);

  const isConformStop = stationID => {
    const isConform = currentSaveStop.find(data => {
      const isRoute = data.routerName === routerName;
      const isStop = data.stationID === stationID;
      return isRoute && isStop;
    });
    return !!isConform;
  };

  const addStationID = stationID => {
    if (currentSaveStop.length > 2) {
      alert("儲存的資料超過上限");
      return;
    }
    const tempArray = [...currentSaveStop];
    tempArray.push({ routerName, stationID });
    setCurrentSaveStop(tempArray);
    localStorage.setItem("station", JSON.stringify(tempArray));
  };

  const deleteStationID = stationID => {
    const tempArray = [...currentSaveStop];
    const deleteIndex = tempArray.findIndex(data => {
      const isRoute = data.routerName === routerName;
      const isStop = data.stationID === stationID;
      return isRoute && isStop;
    });
    tempArray.splice(deleteIndex, 1);
    setCurrentSaveStop(tempArray);
    localStorage.setItem("station", JSON.stringify(tempArray));
  };
  const isDisplayDeaprture = roundTrip && deaprtureData?.Stops?.length > 0;
  const isReturn = !roundTrip && returnData?.Stops?.length > 0;
  return (
    <div className="min-h-screen">
      <div>{`目前選擇的路線：${routerName}`}</div>
      <ul className="flex justify-evenly items-center mb-2">
        <li
          className="border rounded-lg px-3 py-2"
          onClick={() => setRoundTrip(true)}
        >
          去程
        </li>
        <li
          className="border rounded-lg px-3 py-2"
          onClick={() => setRoundTrip(false)}
        >
          返程
        </li>
      </ul>
      <ul className="px-2">
        {isDisplayDeaprture &&
          deaprtureData?.Stops.map(data => {
            const isCurrentSave = isConformStop(data.StationID);
            return (
              <li
                className="flex justify-between items-center mb-2"
                key={data.StopID}
              >
                {data.StopName.Zh_tw}
                {isCurrentSave ? (
                  <a
                    className="w-20 text-center border bg-red-700 text-white rounded-lg p-2"
                    onClick={() => deleteStationID(data.StationID)}
                  >
                    已加入
                  </a>
                ) : (
                  <a
                    className=" w-20 text-center border rounded-lg p-2"
                    onClick={() => addStationID(data.StationID)}
                  >
                    加入
                  </a>
                )}
              </li>
            );
          })}
        {isReturn &&
          returnData?.Stops.map(data => {
            const isCurrentSave = isConformStop(data.StationID);
            return (
              <li
                className="flex justify-between items-center mb-2"
                key={data.StopID}
              >
                {data.StopName.Zh_tw}
                {isCurrentSave ? (
                  <a className="w-20 text-center border bg-red-700 text-white rounded-lg p-2">
                    已加入
                  </a>
                ) : (
                  <a
                    className=" w-20 text-center border rounded-lg p-2"
                    onClick={() => addStationID(data.StationID)}
                  >
                    加入
                  </a>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Route;
