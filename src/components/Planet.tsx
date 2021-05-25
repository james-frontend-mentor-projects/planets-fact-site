import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router";
import PlanetsContext from "../contexts/planetsContext";
import { mobileMediaQuery, planetNames } from "../utils";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { Header } from "./Header";

type SubPage = "overview" | "structure" | "geology";

const subPageMap = {
  overview: "overview",
  structure: "internal structure",
  geology: "surface geology",
};

interface InfoSectionProps {
  heading: string;
  value: string;
}
const InfoSection = ({ heading, value }: InfoSectionProps) => (
  <div className="stats-info-section">
    <span className="heading text-primary-light">{heading}</span>
    <span className="value">{value}</span>
  </div>
);

interface ImageProps {
  planetName: string;
  subPage: SubPage;
}
const Image = ({ planetName, subPage }: ImageProps) => {
  let url = "";
  switch (subPage) {
    case "overview":
      url = `assets/planet-${planetName}.svg`;
      break;
    case "structure":
      url = `assets/planet-${planetName}-internal.svg`;
      break;
    case "geology":
      url = `assets/planet-${planetName}.svg`;
  }

  return (
    <div className="planet-image-container">
      <img src={url} alt={`${planetName} on ${subPage} page`} />
      {subPage === "geology" && (
        <img src={`assets/geology-${planetName}.png`} alt="geology of planet" className="geology" />
      )}
    </div>
  );
};

interface NavigationItemProps {
  subPage: SubPage;
  selectedSubPage: SubPage;
  planetName: string;
  handleClick: (page: SubPage) => void;
  isMobile: boolean;
  index: string;
}
const NavigationItem = ({
  subPage,
  selectedSubPage,
  planetName,
  handleClick,
  isMobile,
  index,
}: NavigationItemProps) => (
  <li className={subPage === selectedSubPage ? "active" : ""}>
    <button className={`text-primary-white tab-${planetName}`} onClick={() => handleClick(subPage)}>
      {isMobile ? (
        subPage
      ) : (
        <>
          <span className="index">{index}</span> {subPageMap[subPage]}
        </>
      )}
    </button>
  </li>
);

interface NavigationProps {
  selectedSubPage: SubPage;
  planetName: string;
  handleClick: (page: SubPage) => void;
}
const Navigation = ({ selectedSubPage, planetName, handleClick }: NavigationProps) => {
  const isMobile = useMediaQuery(mobileMediaQuery);
  return (
    <nav className="sub-page-selector">
      <ul>
        <NavigationItem
          planetName={planetName}
          selectedSubPage={selectedSubPage}
          handleClick={handleClick}
          subPage="overview"
          isMobile={isMobile}
          index="01"
        />
        <NavigationItem
          planetName={planetName}
          selectedSubPage={selectedSubPage}
          handleClick={handleClick}
          subPage="structure"
          isMobile={isMobile}
          index="02"
        />
        <NavigationItem
          planetName={planetName}
          selectedSubPage={selectedSubPage}
          handleClick={handleClick}
          subPage="geology"
          isMobile={isMobile}
          index="03"
        />
      </ul>
    </nav>
  );
};

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
        <main className="pluto">
          <div className="pluto-container">
            <img src="/assets/tombstone.svg" alt="tombstone" />
            <h2 className="text-tab-earth">RIP Pluto</h2>
            <h3 className="text-tab-earth">Forgotten but not gone</h3>
          </div>
        </main>
      ) : (
        <main>
          <Navigation selectedSubPage={subPage} planetName={planetName} handleClick={handleSubPage} />
          <Image planetName={planetName} subPage={subPage} />
          <section className="general-info">
            <h2>{planet.name}</h2>
            <p>{planet[subPage].content}</p>
            <a href={planet[subPage].source} className="text-primary-light" target="_blank" rel="noreferrer">
              Source <span className="bold">Wikepedia</span> <ExternalLinkIcon />
            </a>
          </section>
          <section className="stats-info">
            <InfoSection heading="Rotation time" value={planet.rotation} />
            <InfoSection heading="Revolution time" value={planet.revolution} />
            <InfoSection heading="Radius" value={planet.radius} />
            <InfoSection heading="Average temp." value={planet.temperature} />
          </section>
        </main>
      )}
    </>
  );
};
