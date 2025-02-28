import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvxS7nCU1HjWL5haNtvwj-5027iT_D-tk",
  authDomain: "van-life-f66cb.firebaseapp.com",
  projectId: "van-life-f66cb",
  storageBucket: "van-life-f66cb.firebasestorage.app",
  messagingSenderId: "619996164633",
  appId: "1:619996164633:web:68cf848fd8a8dbebe27088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
        }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}