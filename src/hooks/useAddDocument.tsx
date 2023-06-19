import { useState } from "react";
import { collection, addDoc, DocumentData, doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

interface ErrorType {
  message: string;
}
export const useDocument = (collectionName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const addDocument = async (document: DocumentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, collectionName), document);
      setIsLoading(false);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setIsLoading(false);

      console.error("Error creating document: ", error);
    }
  };
  const updateDocument = async (document: DocumentData, id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = await updateDoc(doc(db, collectionName, id), document);
      setIsLoading(false);
      console.log("Document updated with ID: ", docRef);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setIsLoading(false);

      console.error("Error creating document: ", error);
    }
  };

  return { addDocument, updateDocument, isLoading, error };
};
