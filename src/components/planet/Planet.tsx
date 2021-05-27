import { useContext, useState } from "react";
import { useParams } from "react-router";
import PlanetsContext from "../../contexts/planetsContext";
import { planetNames } from "../../utils";
import { Header } from "../header/Header";
import { InfoSection } from "./InfoSection";
import { PlanetImage } from "./PlanetImage";
import { Pluto } from "./Pluto";
import { SubPageNavigation } from "./SubPageNavigation";
import { SubPage } from "./types";

export interface PlanetParams {
  planetName: string;
}
export const Planet = () => {
  const { planetName } = useParams<PlanetParams>();
  const { planets } = useContext(PlanetsContext);
  const [subPage, setSubPage] = useState<SubPage>("overview");

  const handleSubPage = (page: SubPage) => setSubPage(page);

  // Should never hit this - this should be caught by the router regex bounds
  if (!planetNames.includes(planetName)) return <>Something went wrong!</>;

  const planet = planets.find((p) => p.name.toLowerCase() === planetName);

  return (
    <>
      <Header />
      {planetName === "pluto" ? (
        <Pluto />
      ) : (
        <main>
          <SubPageNavigation selectedSubPage={subPage} planetName={planetName} handleClick={handleSubPage} />
          <PlanetImage planetName={planetName} subPage={subPage} />
          <section className="general-info">
            <h2>{planet && planet.name}</h2>
            <p>{planet && planet[subPage].content}</p>
            <a href={planet && planet[subPage].source} className="text-primary-light" target="_blank" rel="noreferrer">
              Source <span className="bold">Wikepedia</span>{" "}
              <img style={{ display: "inline-block" }} src="assets/icon-source.svg" alt="external website" />
            </a>
          </section>
          <section className="stats-info">
            <h2 className="sr-only">Stats about {planetName}</h2>
            <InfoSection heading="Rotation time" value={planet && planet.rotation} />
            <InfoSection heading="Revolution time" value={planet && planet.revolution} />
            <InfoSection heading="Radius" value={planet && planet.radius} />
            <InfoSection heading="Average temp." value={planet && planet.temperature} />
          </section>
        </main>
      )}
    </>
  );
};
