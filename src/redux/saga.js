import axios from "axios";
import { call, put, takeEvery, take, all } from "redux-saga/effects";

function* fetchBusRouteData() {
  const { routeData } = yield take("FETCH_BUS_ROUTE_DATA");
  const data = yield call(() =>
    axios
      .get(
        `http://localhost:3000/api/bus?route=${encodeURI(
          routeData.routerName
        )}&city=${encodeURI(routeData.city)}`
      )
      .then(response => response)
  );
  yield put({ type: "FETCH_BUS_ROUTE", payload: { data } });
}

function* fetchAllBusRouteList() {
  const [taipeiData, newTaipeiData] = yield all([
    call(() =>
      axios
        .get(`http://localhost:3000/api/allRouteTaipei`)
        .then(response => response)
    ),
    call(() =>
      axios
        .get(`http://localhost:3000/api/allRouteNewTaipei`)
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
        `http://localhost:3000/api/estimatedTimeOfArrival?stationID=${routeData.stationID}`
      )
      .then(response => response)
  );
  const handleData = data.data.data.find(stopData => {
    return stopData.RouteName.Zh_tw === routeData.route;
  });

  yield put({ type: "FETCH_EstimateTime", payload: { data: handleData } });
}

function* mySaga() {
  yield takeEvery("FETCH_BUS_ROUTE_DATA", fetchBusRouteData);
  yield takeEvery("FETCH_ALL_BUS_ROUTE_LIST", fetchAllBusRouteList);
  yield takeEvery("FETCH_EstimateTime_DATA", fetchFetchEstimeTimeData);
}

export default mySaga;
