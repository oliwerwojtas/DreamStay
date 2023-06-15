import { useState, useEffect } from "react";
import { collection, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import { db } from "../config";
import { FormDataCreate2 } from "../types";

export const useFetchUserDocuments = (userId: string | undefined) => {
  const [listings, setListings] = useState<FormDataCreate2[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (userId) {
        const listRef = collection(db, "listings");
        const q = query(listRef, where("user", "==", userId));
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

  return { listings, loading };
};
