import { doc, updateDoc } from "firebase/firestore";
import db from "./firestore";

const postWalletData = async (userId, walletData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      wallet: walletData.wallet, // Update only the 'wallet' field
    });
    console.log("Wallet data successfully updated!");
  } catch (e) {
    console.error("Error updating wallet data: ", e);
  }
};

export { postWalletData };
