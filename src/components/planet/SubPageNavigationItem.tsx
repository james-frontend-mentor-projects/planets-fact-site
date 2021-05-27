import { SubPage } from "./types";

const subPageMap = {
  overview: "overview",
  structure: "internal structure",
  geology: "surface geology",
};

interface Props {
  subPage: SubPage;
  selectedSubPage: SubPage;
  planetName: string;
  handleClick: (page: SubPage) => void;
  isMobile: boolean;
  index: string;
}
export const SubPageNavigationItem = ({
  subPage,
  selectedSubPage,
  planetName,
  handleClick,
  isMobile,
  index,
}: Props) => (
  <li className={subPage === selectedSubPage ? "active" : ""}>
    <button className={`text-primary-white nav-tab-${planetName}`} onClick={() => handleClick(subPage)}>
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
