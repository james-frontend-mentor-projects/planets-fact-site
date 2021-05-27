interface Props {
  heading: string;
  value: string | undefined;
}
export const InfoSection = ({ heading, value }: Props) => (
  <div className="stats-info-section">
    <span className="heading text-primary-light">{heading}</span>
    <span className="value">{value}</span>
  </div>
);
