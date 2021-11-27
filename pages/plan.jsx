import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import KeyBoard from "../component/KeyBoard";

import search from "../public/image/search.svg";

const Plan = () => {
  const [allBusListData, setAllbusListData] = useState([]);
  const [busRoute, setBusRoute] = useState("");
  const [routeKeyBoard, setRouteKeyBoard] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const allBusList = useSelector(state => state.allBusList);
  const dispatch = useDispatch();

  const isSearchResult = allBusListData.length > 0 && searchValue;

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_BUS_ROUTE_LIST" });
  }, []);

  useEffect(() => {
    if (!!busRoute) {
      dispatch({ type: "FETCH_BUS_ROUTE_DATA", route: busRoute });
    }
  }, [busRoute]);

  useEffect(() => {
    if (allBusList.length > 0) {
      const tempArray = [...allBusList];
      const routeList = tempArray.map(item => ({
        routeUid: item.RouteUID,
        city: item.City,
        routeName: item.RouteName.Zh_tw,
        departureStop: item.DepartureStopNameZh,
        destinationStop: item.DestinationStopNameZh,
      }));
      setAllbusListData(routeList);
    }
  }, [allBusList]);

  return (
    <>
      <Head>
        <title>米路通</title>
        <meta name="description" content="搜尋公車路線" />
        <link rel="icon" href="/star.ico" />
      </Head>
      <div
        className={`${
          routeKeyBoard ? "min-h-c-full" : "min-h-c-screen"
        } relative`}
      >
        <div className="relative h-9">
          <input
            className="h-full pl-9 rounded-lg"
            value={searchValue}
            placeholder="請輸入路線"
            onChange={e => setSearchValue(e.target.value)}
          ></input>
          <div className="absolute top-0 left-0">
            <Image src={search} />
          </div>
        </div>

        <div onClick={() => setRouteKeyBoard(!routeKeyBoard)}>
          {routeKeyBoard ? "關閉小鍵盤" : "開啟小鍵盤"}
        </div>
        <div className="relative">
          {isSearchResult &&
            allBusListData
              .filter(item => item.routeName.includes(searchValue))
              .map(item => (
                <Link
                  href={`/route/${encodeURIComponent(
                    item.routeName
                  )}?routeUid=${item.routeUid}&city=${item.city}`}
                  passHref
                  key={item.routeName}
                >
                  <div className="w-full flex items-center border border-blue-900 rounded-lg p-4 mb-2">
                    <span className="w-1/4">{item.routeName}</span>
                    <span className="w-3/4 flex justify-around">
                      <span className="w-5/12 inline-flex justify-center">
                        {item.departureStop}
                      </span>
                      <span className="w-2/12 inline-flex justify-center">
                        -
                      </span>
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
    </>
  );
};

export default Plan;
