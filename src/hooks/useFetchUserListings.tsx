import { useState, useEffect } from "react";
import { collection, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import { db } from "../config";
import { FormDataCreate2 } from "../types";
import { ErrorType } from "../types";

export const useFetchUserListings = (userId?: string) => {
  const [listings, setListings] = useState<FormDataCreate2[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchUserListings = async () => {
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

    fetchUserListings();
  }, [userId]);

  return { listings, loading };
};
