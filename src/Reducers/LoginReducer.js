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
      allUsers.map(user => {
        if(user.id === cookies.user) {
            status = true;
        }
      })
    });
    return status;
}

    console.log('something')
    console.log(action)
  switch (action) {
    case "CHECK_DATA":

      return checkLoginStatus();

    case "IS_LOGED_IN":
      return checkLoginStatus();
    
    default:
      return checkLoginStatus();
  }
};
