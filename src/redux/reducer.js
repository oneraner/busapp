import plan from "../../pages/plan";

export const FETCH_ALL_BUS_LIST = "FETCH_ALL_BUS_LIST";
export const FETCH_BUS_ROUTE = "FETCH_BUS_ROUTE";
export const FETCH_BUS_STOP = "FETCH_BUS_STOP";
export const FETCH_EstimateTime = "FETCH_EstimateTime";

const initState = {
  plan: [],
  allBusList: {},
  busRouteData: {},
  busStopData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ALL_BUS_LIST:
      return {
        ...state,
        allBusList: [
          ...action.payload.taipeiData.data.data,
          ...action.payload.newTaipeiData.data.data,
        ],
      };
    case FETCH_BUS_ROUTE:
      return {
        ...state,
        busRouteData: action.payload.data,
      };
    case FETCH_BUS_STOP:
      return {
        ...state,
        busStopData: action.payload.data,
      };
    case FETCH_EstimateTime:
      const tempArray = [...state.plan, action.payload.data];
      return {
        ...state,
        plan: tempArray,
      };
    default:
      return { ...state };
  }
};

export default reducer;
