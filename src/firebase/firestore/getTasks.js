import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebase_app from '../config';
import { env } from '@/Helpers/constans';

const db = getFirestore(firebase_app);

export default async function getTasksForUser(userId) {
    try {
        // Query tasks collection where userId matches
        const q = query(collection(db, `Tasks--${env}`), where('userUid', '==', userId));
        
        // Get all documents that match the query
        const querySnapshot = await getDocs(q);

        // Extract task data from query snapshot
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });

        return { tasks, error: null };
    } catch (error) {
        return { tasks: null, error };
    }
}
