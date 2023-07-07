import { useState, useEffect } from "react";
import { collection, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import { db } from "../config";
import { FormDataCreate2 } from "../types";

interface ErrorType {
  message: string;
}
export const useFetchUserDocuments = (userId?: string) => {
  const [listings, setListings] = useState<FormDataCreate2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  useEffect(() => {
    const fetchUserDocuments = async () => {
      const listRef = collection(db, "listings");
      let q = query(listRef);

      if (userId) {
        q = query(listRef, where("userRef", "==", userId));
      }
      try {
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
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError({ message: errorMessage });
        console.error("Error fetching documents: ", error);
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, [userId]);

  return { listings, loading };
};
