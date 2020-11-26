import UsersCollection from "../collections/UsersCollection";
import { useCookies } from "react-cookie";

export const LoginReducer = (action) => {
  const [cookies, setCookie] = useCookies();

  const checkLoginStatus = () => {
    let allUsers = [];
    let status = false;
    UsersCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allUsers.push(doc.data());
      });
      allUsers.map((user) => {
        if (user.id === cookies.user) {
          status = true;
        }
      });
    });
    return status;
  };

  switch (action) {
    case "CHECK_DATA":
      return checkLoginStatus();

    case "IS_LOGED_IN":
      return checkLoginStatus();

    case "SIGN_UP":
      return;

    default:
      return checkLoginStatus();
  }
};
