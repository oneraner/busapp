import React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Route = () => {
  const router = useRouter();
  const { routerName } = router.query;
  console.log("router.query", routerName);
  return <div className="min-h-screen">route</div>;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Route);
