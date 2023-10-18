import React from "react";
import Update from "../../../../../components/Update";
import { useEffect } from "react";

const UpdatePage = () => {
  useEffect(() => {
    console.log("updateParentRender");
  }, []);
  return <Update />;
};

export default UpdatePage;
