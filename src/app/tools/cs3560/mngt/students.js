import firebaseApp from "./config";
import {
  getFirestore,
  collection,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function getStudents() {
  const studentListQuery = query(collection(db, "students"));

  let result = null,
    error = null;
  try {
    result = await getDoc(studentListQuery);
  } catch (e) {
    error = e;
  }
  return { result, error };
}
