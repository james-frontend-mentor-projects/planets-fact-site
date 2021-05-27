import { SubPage } from "./types";

interface Props {
  planetName: string;
  subPage: SubPage;
}
export const PlanetImage = ({ planetName, subPage }: Props) => {
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
