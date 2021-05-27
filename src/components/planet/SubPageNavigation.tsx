import { useMediaQuery } from "react-responsive";
import { mobileMediaQuery } from "../../utils";
import { SubPageNavigationItem } from "./SubPageNavigationItem";
import { SubPage } from "./types";

interface Props {
  selectedSubPage: SubPage;
  planetName: string;
  handleClick: (page: SubPage) => void;
}
export const SubPageNavigation = ({ selectedSubPage, planetName, handleClick }: Props) => {
  const isMobile = useMediaQuery(mobileMediaQuery);
  return (
    <nav className="sub-page-selector">
      <ul>
        <SubPageNavigationItem
          planetName={planetName}
          selectedSubPage={selectedSubPage}
          handleClick={handleClick}
          subPage="overview"
          isMobile={isMobile}
          index="01"
        />
        <SubPageNavigationItem
          planetName={planetName}
          selectedSubPage={selectedSubPage}
          handleClick={handleClick}
          subPage="structure"
          isMobile={isMobile}
          index="02"
        />
        <SubPageNavigationItem
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
