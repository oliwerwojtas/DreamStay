import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config";
import { FormDataCreate2 } from "../types";
import { toast } from "react-toastify";
interface ErrorType {
  message: string;
}
export const useFetchUserDocuments = (userId: string | undefined) => {
  const [listings, setListings] = useState<FormDataCreate2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (userId) {
        const listRef = collection(db, "listings");
        const q = query(listRef, where("userRef", "==", userId));
        const querySnap = await getDocs(q);
        const listings: FormDataCreate2[] = [];
        querySnap.forEach((doc: DocumentSnapshot) => {
          const docData = doc.data() as FormDataCreate2["data"] | undefined;
          if (docData !== undefined) {
            listings.push({
              id: doc.id,
              data: docData,
            });
          }
        });

        setListings(listings);
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, [userId]);
  const deleteDocument = async (collectionName: string, documentID: string) => {
    setLoading(true);
    setError(null);

    try {
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteDoc(doc(db, collectionName, documentID));
        toast.success("Successfully deleted the document");
        const updatedListings = listings.filter((listing) => listing.id !== documentID);
        setListings(updatedListings);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      console.error("Error deleting document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, deleteDocument };
};
