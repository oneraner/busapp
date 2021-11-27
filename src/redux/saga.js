import axios from "axios";
import { call, put, takeEvery, take, all } from "redux-saga/effects";

function* fetchBusRouteData() {
  const { routeData } = yield take("FETCH_BUS_ROUTE_DATA");
  try {
    const data = yield call(() =>
      axios
        .get(
          `${window.location.origin}/api/bus?route=${encodeURI(
            routeData.routerName
          )}&city=${encodeURI(routeData.city)}`
        )
        .then(response => response)
    );
    const uniRouteData = data?.data?.data.filter(
      data => data.RouteUID === routeData.routeUid
    );
    yield put({
      type: "FETCH_BUS_ROUTE",
      payload: { data: uniRouteData },
    });
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchAllBusRouteList() {
  const [taipeiData, newTaipeiData] = yield all([
    call(() =>
      axios
        .get(`${window.location.origin}/api/allRouteTaipei`)
        .then(response => response)
    ),
    call(() =>
      axios
        .get(`${window.location.origin}/api/allRouteNewTaipei`)
        .then(response => response)
    ),
  ]);
  yield put({
    type: "FETCH_ALL_BUS_LIST",
    payload: { taipeiData, newTaipeiData },
  });
}

function* fetchFetchEstimeTimeData() {
  const { routeData } = yield take("FETCH_EstimateTime_DATA");
  const data = yield call(() =>
    axios
      .get(
        `${window.location.origin}/api/estimatedTimeOfArrival?stationID=${routeData.stationID}&city=${routeData.city}`
      )
      .then(response => response)
  );
  const handleData = data.data.data.find(stopData => {
    return stopData.RouteName.Zh_tw === routeData.route;
  });
  console.log("handleData ", handleData);
  yield put({ type: "FETCH_EstimateTime", payload: { data: handleData } });
}

function* mySaga() {
  yield takeEvery("FETCH_BUS_ROUTE_DATA", fetchBusRouteData);
  yield takeEvery("FETCH_ALL_BUS_ROUTE_LIST", fetchAllBusRouteList);
  yield takeEvery("FETCH_EstimateTime_DATA", fetchFetchEstimeTimeData);
}

export default mySaga;
