import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "./firestore";

const getWalletData = async (userId) => {
  try {
    // Fetch user data
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    const walletData = docSnap.data();
    console.log("Wallet data successfully retrieved!");
    return walletData;
  } catch (e) {
    console.error("Error fetching user details:", e);
    throw e;
  }
};

const postWalletData = async (userId, data) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    console.log("Wallet data successfully updated!");
  } catch (e) {
    console.error("Error updating wallet data: ", e);
  }
};

export { getWalletData, postWalletData  };
