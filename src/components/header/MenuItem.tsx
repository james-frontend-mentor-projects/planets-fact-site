import { Link } from "react-router-dom";

interface Props {
  planetName: string;
  handleClick: () => void;
  isMobile: boolean;
  currentPlanet: string;
}
export const MenuItem = ({ planetName, handleClick, isMobile, currentPlanet }: Props) => (
  <li className={planetName === currentPlanet ? "text-primary-white" : "text-primary-light"}>
    <Link to={`/${planetName}`} onClick={handleClick} className={`nav-tab-${planetName}`}>
      {isMobile && <div className={`circle bg-planet-${planetName}`}></div>}
      <span className="planet-name">{planetName}</span>
      {isMobile && <img src="assets/icon-chevron.svg" alt="chevron" className="chevron" />}
    </Link>
  </li>
);
