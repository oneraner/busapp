import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import KeyBoard from "../components/KeyBoard";

import search from "../public/image/search.svg";
import civet_cat from "../public/image/civet_cat.png";

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
  }, [dispatch]);

  useEffect(() => {
    if (!!busRoute) {
      dispatch({ type: "FETCH_BUS_ROUTE_DATA", route: busRoute });
    }
  }, [busRoute, dispatch]);

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
        <title>迷路通</title>
        <meta name="description" content="搜尋公車路線" />
        <link rel="icon" href="/star.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`${
          routeKeyBoard ? "min-h-c-full" : "min-h-c-screen"
        } relative`}
      >
        <div className="relative h-9 mx-3 my-2">
          <input
            className="w-full h-full pl-9 rounded-lg"
            value={searchValue}
            placeholder="請輸入路線"
            onChange={e => setSearchValue(e.target.value)}
          ></input>
          <div className="absolute top-2 left-2">
            <Image src={search} />
          </div>
        </div>
        <div className="mb-2">
          <button
            type="button"
            className="text-c-second border border-c-second rounded-lg p-1 ml-3"
            onClick={() => setRouteKeyBoard(!routeKeyBoard)}
          >
            {routeKeyBoard ? "關閉小鍵盤" : "開啟小鍵盤"}
          </button>
        </div>
        <div className="relative">
          {!isSearchResult && (
            <div className="relative pt-8">
              <h2 className="absolute top-8 right-16 text-sm text-c-blue">
                <p className="mb-1">想去哪裡呢？</p>
                <p>試著搜尋路線吧</p>
              </h2>
              <Image src={civet_cat} />
            </div>
          )}
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
                  <div className="flex items-center font-roboto text-c-dark bg-c-white rounded-lg px-2 mx-2 py-4 mb-2">
                    <span className="w-2/12">{item.routeName}</span>
                    <span className="w-10/12 flex justify-evenly">
                      <span className="w-5/12 inline-flex justify-center items-center">
                        {item.departureStop}
                      </span>
                      <span className="w-1/12 inline-flex justify-center items-center">
                        -
                      </span>
                      <span className="w-5/12 inline-flex justify-center items-center">
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
