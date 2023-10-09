import { useState } from "react";
import { collection, addDoc, DocumentData, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { DataFromCreate, ErrorType } from "../types/others/others";
import { toast } from "react-toastify";

export const useDocument = (collectionName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [listings, setListings] = useState<DataFromCreate[]>([]);
  const addDocument = async (document: DocumentData) => {
    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, collectionName), document);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setIsLoading(false);

      toast.error(`Error creating document: ${errorMessage}`);
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

      toast.error(errorMessage);
    }
  };

  const deleteDocument = async (collectionName: string, documentID: string) => {
    setIsLoading(true);
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
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { addDocument, updateDocument, deleteDocument, isLoading, error };
};
