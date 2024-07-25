import React from "react";
import "./Loader.css";
import { useLoader } from "../../context/LoaderContext";
import { ICON } from "../../utils/icon";

const Loader = () => {
  const { loading } = useLoader();
  if (!loading) return null;
  
  return (
    <div style={{ background: "white" }} className="loader-container">
      <div>
        {ICON.LOADER}
      </div>
    </div>
  );
};

export default Loader;
