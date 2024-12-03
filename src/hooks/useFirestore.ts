import { useCallback } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestore = (collectionName: string) => {
  const add = useCallback(async (data: any) => {
    try {
      return await addDoc(collection(db, collectionName), data);
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }, [collectionName]);

  const update = useCallback(async (id: string, data: any) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }, [collectionName]);

  const remove = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }, [collectionName]);

  const get = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }, [collectionName]);

  return { add, update, remove, get };
};
