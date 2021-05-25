import ReactLoaderSpinner from "react-loader-spinner";

export const Loader: React.FC = () => (
  <div className="loader-container">
    <ReactLoaderSpinner type="Rings" color="#979797" height={150} width={150} />
  </div>
);
