import { auth, db } from "@/lib/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

let sessionStatus = false;
let isEmailVerified = true;
let userDetails;
let dabaseTrials;

export const suscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    userDetails = {
      token: user.refreshToken,
      email: user.email,
      isEmailVerified: user.emailVerified,
    };
    sessionStatus = true;
    isEmailVerified = user.emailVerified;
    const getTrials = async () => {
      const usersDb = collection(db, "users");
      let allUsersEmail: any = [];
      const snapshot = await getDocs(usersDb);
      snapshot.forEach((doc) =>
        allUsersEmail.push({ id: doc.id, data: doc.data() }),
      );
      const userId = allUsersEmail.filter(
        (dbUser: any) => dbUser.data.userEmail === user.email,
      )[0];

      dabaseTrials = {
        databaseID: userId.id,
        trials: userId.data.trials,
      };
    };
    getTrials();
  }
});

export { sessionStatus, isEmailVerified, userDetails, dabaseTrials };
