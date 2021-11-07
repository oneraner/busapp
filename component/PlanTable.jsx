import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

export const PlanTable = props => {
  const { plan } = props;
  const [currentSaveStop, setCurrentSaveStop] = useState([]);

  useEffect(() => {
    if (!!localStorage.getItem("station")) {
      setCurrentSaveStop(JSON.parse(localStorage.getItem("station")));
    }
  }, []);
  useEffect(() => {
    if (currentSaveStop.length > 0) {
      currentSaveStop.map(data =>
        props.getEstimateTime({
          route: data.routerName,
          stationID: data.stationID,
        })
      );
    }
  }, [currentSaveStop]);
  console.log("plan", plan);
  return <div>plan</div>;
};

const mapStateToProps = state => {
  return {
    plan: state.plan,
  };
};

const mapDispatchToProps = dispatch => ({
  getEstimateTime: routeData => {
    dispatch({ type: "FETCH_EstimateTime_DATA", routeData });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanTable);
