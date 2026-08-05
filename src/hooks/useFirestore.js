import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { PORTFOLIO } from "../data.js";

/** Hook générique pour une collection Firestore avec fallback sur data.js */
export function useCollection(collectionName) {
  const fallback = PORTFOLIO[collectionName] || [];
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, collectionName));
      const firestoreData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Si Firestore contient des données, on utilise Firestore ; sinon fallback static
      if (firestoreData && firestoreData.length > 0) {
        setData(firestoreData);
      } else {
        setData(fallback);
      }
    } catch (e) {
      console.warn(`Firestore [${collectionName}] indisponible/vide, utilisation des données locales static :`, e);
      setData(fallback);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const add = async (item) => {
    try {
      await addDoc(collection(db, collectionName), item);
      fetchData();
    } catch (e) {
      console.error("Erreur d'ajout Firestore:", e);
    }
  };

  const update = async (id, item) => {
    try {
      await updateDoc(doc(db, collectionName, id), item);
      fetchData();
    } catch (e) {
      console.error("Erreur de modification Firestore:", e);
    }
  };

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (e) {
      console.error("Erreur de suppression Firestore:", e);
    }
  };

  return { data: data.length > 0 ? data : fallback, loading, add, update, remove, refresh: fetchData };
}
