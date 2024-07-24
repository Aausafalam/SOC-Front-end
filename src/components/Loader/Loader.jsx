import React from "react";
import "./Loader.css";
import { useLoader } from "../../context/LoaderContext";
import { ICONS } from "../../utils/icons";

const Loader = () => {
  const { loading } = useLoader();
  if (!loading) return null;
  
  return (
    <div style={{ background: "white" }} className="loader-container">
      <div>
        {ICONS.LOADER}
      </div>
    </div>
  );
};

export default Loader;
