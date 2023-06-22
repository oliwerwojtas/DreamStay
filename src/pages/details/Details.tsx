import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/Spinner";

export const Details = () => {
  const { id } = useParams();
  const { listings } = useFetchUserDocuments();

  const details = listings.find((listing) => listing.id === id);

  if (!details) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <span>{details.data.name}</span>
      </div>
    </div>
  );
};
