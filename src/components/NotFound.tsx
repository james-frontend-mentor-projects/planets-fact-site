import { Redirect, useParams } from "react-router";
import { planetNames } from "../utils";
import { Header } from "./Header";

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
      <p>Well, that isn't a real planet...</p>
    </>
  );
};
