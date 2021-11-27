import * as React from "react";
import Head from "next/head";
import PlanTable from "../components/PlanTable";

const Home = () => {
  return (
    <div>
      <Head>
        <title>迷路通</title>
        <meta name="description" content="顯示到站時間" />
        <link rel="icon" href="/star.ico" />
      </Head>
      <div className="min-h-c-screen">
        <PlanTable />
      </div>
    </div>
  );
};

export default Home;
