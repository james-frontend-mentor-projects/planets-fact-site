import { Redirect, useParams } from "react-router";
import { planetNames } from "../utils";
import { Header } from "./header/Header";

interface Params {
  param: string;
}
export const NotFound = () => {
  const { param } = useParams<Params>();

  // incorrect capitalisation -> redirect to proper url
  if (planetNames.includes(param.toLowerCase())) return <Redirect to={`/${param.toLowerCase()}`} />;

  return (
    <>
      <Header />
      <p style={{ textAlign: "center", marginTop: "5rem" }}>
        Well, that isn't a real planet...
        <br />
        At least, not one in the Solar System...
      </p>
    </>
  );
};
