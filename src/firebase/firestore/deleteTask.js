import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export default async function deleteTask(collection, id) {
    let result = null;
    let error = null;

    try {
        await deleteDoc(doc(db, collection, id));
        result = "Task deleted successfully";
    } catch (e) {
        error = e;
        console.error(e);
    }

    return { result, error };
}
