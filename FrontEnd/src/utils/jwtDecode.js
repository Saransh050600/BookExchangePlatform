import { jwtDecode } from "jwt-decode";

export const getDecodedUserId = token => {
  if (token) {
    const decoded = jwtDecode(token); //Decode the Token 
    return decoded.userId; //Return the userID from Decoded Token
  }
  return null;
};
