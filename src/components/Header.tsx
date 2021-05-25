import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mobileMediaQuery, planetNames } from "../utils";
import { useMediaQuery } from "react-responsive";
import { PlanetParams } from "./Planet";

interface MenuItemProps {
  planetName: string;
  handleClick: () => void;
  isMobile: boolean;
  currentPlanet: string;
}
const MenuItem = ({ planetName, handleClick, isMobile, currentPlanet }: MenuItemProps) => (
  <li className={planetName === currentPlanet ? "text-primary-white" : "text-primary-light"}>
    <Link to={`/${planetName}`} onClick={handleClick}>
      {isMobile && <div className={`circle bg-planet-${planetName}`}></div>}
      <span className="planet-name">{planetName}</span>
      {isMobile && (
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M1 1L5 5L1 9" stroke="white" />
        </svg>
      )}
    </Link>
  </li>
);

const Hamburger = () => (
  // copied directly from Figma layout
  <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.248746" filter="url(#filter0_d)">
      <rect x="4" width="24" height="3" fill="white" />
      <rect x="4" y="7" width="24" height="3" fill="white" />
      <rect x="4" y="14" width="24" height="3" fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="32"
        height="25"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export const Header = () => {
  const currentPlanet = useParams<PlanetParams>().planetName;
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(mobileMediaQuery);

  const toggleOpen = () => {
    if (isMobile) {
      setOpen(!open);
    } else {
      setOpen(false);
    }
  };

  return (
    <header>
      <h1 className="text-primary-white">The planets</h1>
      {isMobile && (
        <button className="hamburger text-primary-regular" onClick={toggleOpen}>
          <Hamburger />
        </button>
      )}
      {(!isMobile || (isMobile && open)) && (
        <nav>
          <ul>
            {planetNames
              .filter((planetName) => planetName !== "pluto")
              .map((planetName, i) => (
                <MenuItem
                  key={i}
                  planetName={planetName}
                  handleClick={toggleOpen}
                  isMobile={isMobile}
                  currentPlanet={currentPlanet}
                />
              ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
