import { useState, useEffect } from "react";
import { collection, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import { db } from "../config";
import { DataFromCreate } from "../types/others/others";

import { toast } from "react-toastify";

export const useFetchUserListings = (userId?: string) => {
  const [listings, setListings] = useState<DataFromCreate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserListings = async () => {
      const listRef = collection(db, "listings");
      let q = query(listRef);

      if (userId) {
        q = query(listRef, where("userRef", "==", userId));
      }
      try {
        const querySnap = await getDocs(q);
        const listings: DataFromCreate[] = [];
        querySnap.forEach((doc: DocumentSnapshot) => {
          const docData = doc.data() as DataFromCreate["data"] | undefined;
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

        toast.error(`${errorMessage}`);
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [userId]);

  return { listings, loading };
};
