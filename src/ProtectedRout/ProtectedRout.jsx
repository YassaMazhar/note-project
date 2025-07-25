import React, { useContext } from "react";
import { Navigate } from "react-router";
import { TokenContext } from "../Context/Token-Context";

export default function ProtectedRout({children}) {
  let { token } = useContext(TokenContext);
  if (token == null) {
    return <Navigate to={"/signin"} />;
  }
  else{
    return children
  }
}
