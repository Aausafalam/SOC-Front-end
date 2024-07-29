import React from 'react';
import Style from './Main.module.css';  // Import CSS module

const Node = () => {
  return <div className={Style.node}>Node Component - Common Protocols</div>;
};



const NodeType = () => {
  return (
    <div className={Style.node_type}>
      <Node />
      {/* <Type /> */}
    </div>
  );
};

export default NodeType;
