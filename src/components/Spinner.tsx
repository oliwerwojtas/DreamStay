import spinner from "../assets/spinner.svg";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <img src={spinner} alt="Loading spinner" className="h-24" />
      </div>
    </div>
  );
};
