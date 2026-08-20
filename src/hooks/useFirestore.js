import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { PORTFOLIO } from "../data.js";

const PROFILE_CACHE_KEY = "portfolio-profile-cache";

function cacheProfile(value) {
  try {
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(value));
  } catch (e) {
    console.warn("Impossible de mettre le profil en cache local:", e);
  }
}

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

/** Hook pour un document unique "profile" (single doc) avec fallback sur data.js */
export function useProfile() {
  const fallback = PORTFOLIO.personal || {};
  // Photo/texte affichés immédiatement depuis le cache local si présent
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(PROFILE_CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const ref = doc(db, "profile", "main");
      const snap = await getDoc(ref);
      const next = snap.exists() ? { ...fallback, ...snap.data() } : fallback;
      setData(next);
      cacheProfile(next);
    } catch (e) {
      console.warn(`Firestore [profile] indisponible/vide, utilisation des données locales :`, e);
      setData(fallback);
      cacheProfile(fallback);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const update = async (item) => {
    try {
      await setDoc(doc(db, "profile", "main"), item, { merge: true });
      const next = { ...data, ...item };
      setData(next);
      cacheProfile(next);
      return true;
    } catch (e) {
      console.error("Erreur de mise à jour du profil Firestore:", e);
      return false;
    }
  };

  return { data, loading, update, refresh: fetchData };
}
