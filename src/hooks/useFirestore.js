import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

/** Hook générique pour une collection Firestore */
export function useCollection(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, collectionName));
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(`Erreur Firestore [${collectionName}]:`, e);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const add = async (item) => {
    await addDoc(collection(db, collectionName), item);
    fetchData();
  };

  const update = async (id, item) => {
    await updateDoc(doc(db, collectionName, id), item);
    fetchData();
  };

  const remove = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
    fetchData();
  };

  return { data, loading, add, update, remove, refresh: fetchData };
}
