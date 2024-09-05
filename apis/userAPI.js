import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "./firestore";

const getUserData = async (userId) => {
  try {
    // Fetch user data
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data()
      console.log("User data successfully retrieved!");
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching user data:", e);
    throw e;
  }
};

const postUserData = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        baseCurrency: userData.baseCurrency,
        favouriteCodes: userData.favouriteCodes
      });
    console.log("User data successfully updated!");
  } catch (e) {
    console.error("Error updating user data: ", e);
  }
};

export { getUserData, postUserData };
