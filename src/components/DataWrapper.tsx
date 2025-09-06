/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "./Spinner";

interface Props {
  isLoading: boolean;
  error?: any;
  children: React.ReactNode;
}

const DataWrapper = ({ isLoading, error, children }: Props) => {
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading data.
      </p>
    );
  return <>{children}</>;
};

export default DataWrapper;
