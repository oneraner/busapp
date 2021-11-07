import router from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import KeyBoard from "../component/KeyBoard";

const Plan = props => {
  const { allBusList, busRouteData } = props;
  const [allBusListData, setAllbusListData] = useState([]);
  const [busRoute, setBusRoute] = useState("");
  const [busStop, setBusStop] = useState("");
  const [routeKeyBoard, setRouteKeyBoard] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const displayStopList = JSON.stringify(busRouteData);
  useEffect(() => {
    props.getAllBusList();
  }, []);

  useEffect(() => {
    if (!!busRoute) {
      props.getData(busRoute);
    }
  }, [busRoute]);

  useEffect(() => {
    if (allBusList.length > 0) {
      const tempArray = [...allBusList];
      const routeList = tempArray.map(item => ({
        city: item.City,
        routeName: item.RouteName.Zh_tw,
        departureStop: item.DepartureStopNameZh,
        destinationStop: item.DestinationStopNameZh,
      }));
      setAllbusListData(routeList);
    }
  }, [allBusList]);

  const isSearchResult = allBusListData.length > 0 && searchValue;

  return (
    <div className="min-h-screen relative">
      <div>
        目前搜尋:
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        ></input>
      </div>

      <div onClick={() => setRouteKeyBoard(!routeKeyBoard)}>
        {routeKeyBoard ? "關閉小鍵盤" : "開啟小鍵盤"}
      </div>
      <input placeholder="搜尋公車站牌"></input>
      <div className="relative">
        {isSearchResult &&
          allBusListData
            .filter(item => item.routeName.includes(searchValue))
            .map(item => (
              <Link
                href={`/route/${encodeURIComponent(item.routeName)}?city=${
                  item.city
                }`}
                key={item.routeName}
              >
                <div className="w-full flex items-center border border-blue-900 rounded-lg p-4 mb-2">
                  <span className="w-1/4">{item.routeName}</span>
                  <span className="w-3/4 flex justify-around">
                    <span className="w-5/12 inline-flex justify-center">
                      {item.departureStop}
                    </span>
                    <span className="w-2/12 inline-flex justify-center">-</span>
                    <span className="w-5/12 inline-flex justify-center">
                      {item.destinationStop}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
      </div>
      {routeKeyBoard && (
        <KeyBoard value={searchValue} handleChange={setSearchValue} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allBusList: state.allBusList,
    busRouteData: state.busRouteData,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: route => {
    dispatch({ type: "FETCH_BUS_ROUTE_DATA", route });
  },
  getAllBusList: () => {
    dispatch({ type: "FETCH_ALL_BUS_ROUTE_LIST" });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
