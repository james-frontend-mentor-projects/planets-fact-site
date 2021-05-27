import { useState } from "react";
import { useParams } from "react-router-dom";
import { mobileMediaQuery, planetNames } from "../../utils";
import { useMediaQuery } from "react-responsive";
import { PlanetParams } from "../planet/Planet";
import { MenuItem } from "./MenuItem";
import { HamburgerButton } from "./HamburgerButton";

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
      {isMobile && <HamburgerButton handleClick={toggleOpen} />}
      {(!isMobile || (isMobile && open)) && (
        <nav className="planet-selector">
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
