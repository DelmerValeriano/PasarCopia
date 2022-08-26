import { GoogleSignin } from "@react-native-community/google-signin";
import { GOOGLE_AUTH } from "./../commons/consts/credentials";

export const configureGoogleSignin = () => {
  return GoogleSignin.configure({
    scopes: ["email"],
    webClientId: GOOGLE_AUTH,
    offlineAccess: true,
  });
};
