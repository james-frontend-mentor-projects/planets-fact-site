interface Props {
  handleClick: () => void;
}
export const HamburgerButton = ({ handleClick }: Props) => (
  <button className="hamburger text-primary-regular" onClick={handleClick}>
    <img src="assets/icon-hamburger.svg" alt="open menu" />
  </button>
);
