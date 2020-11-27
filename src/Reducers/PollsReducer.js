import PollsCollection from "../collections/PollsCollection";
import firebase from "firebase/app";

export const PollsReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ALL_POLLS":
      return action.payload.allPolls;
    case "ADD_POLL":
      console.log(action);
      PollsCollection.doc(action.payload.id)
        .set(action.payload)
        .then(() => alert("Poll added successfully!"));
      return [...state, action.payload];
    case "ADDVOTE_POLL":
      PollsCollection.doc(action.payload.id)
        .get()
        .then((response) => {
          return response.data();
        })
        .then((data) => {
          let newRestaurantVoteState = [...data.restaurants];
          let prevState = [...data.restaurants];

          newRestaurantVoteState = newRestaurantVoteState.filter(
            (restaurant) => restaurant.restaurantId === action.vote
          );

          let index = prevState.indexOf(newRestaurantVoteState[0]);

          newRestaurantVoteState[0].votes += 1;
          prevState[index] = newRestaurantVoteState[0];
          if (data.active) {
            PollsCollection.doc(action.payload.id)
              .update({
                restaurants: prevState,
                voters: firebase.firestore.FieldValue.arrayUnion(action.userId),
              })
              .then(() => {});
          } else {
            alert("Ova anketa je istekla, glasanje nije moguce");
          }
        });

      //   PollsCollection.doc(action.payload.pollId)
      //     .get()
      //     .then((response) => {
      //       return response.payload();
      //     })
      //     .then((payload) => {
      //       let newRestaurantVoteState = [...payload.restaurants];
      //       let prevState = [...payload.restaurants];

      //       newRestaurantVoteState = newRestaurantVoteState.filter(
      //         (restaurant) => restaurant.restaurantId === action.payload.vote
      //       );

      //       let index = prevState.indexOf(newRestaurantVoteState[0]);

      //       newRestaurantVoteState[0].votes += 1;
      //       prevState[index] = newRestaurantVoteState[0];
      //       if (payload.active) {
      //         PollsCollection.doc(action.payload.pollId).update({
      //           restaurants: prevState,
      //           voters: firebase.firestore.FieldValue.arrayUnion(
      //             action.payload.userId
      //           ),
      //         });
      //       }
      //     });

      let arrAllPolls = [];
      setTimeout(() => {
        PollsCollection.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arrAllPolls.push(doc.data());
          });
        });
      }, 2000);
      setTimeout(() => {}, 1500);
      return arrAllPolls;
    case "FINISHED_POLL":
      console.log(action);
      PollsCollection.doc(action.payload.id)
        .get()
        .then((response) => {
          if (response.data().createBy === action.payload.createBy) {
            PollsCollection.doc(action.payload.id).update({
              active: false,
              restaurantId: action.restaurantId,
            });
            alert("Poll is now finished!");
          } else alert("Only creator of this poll can finish it!");
        });

      // let prevState = [...state];
      // let newState;
      // newState = [...state].filter((poll) => poll.id === action.payload.id)[0];
      // let index = prevState.indexOf(newState);

      // newState.active = false;
      // prevState[index] = newState;
      return [...state];
    case "ISORDER_CREATED":
      // const { name, email, phone, id } = action.customer;
      // CustomersCollection.doc(id).set({ name, email, phone, id });
      // return [...state, { name, email, phone, id }];
      return state;
    case "REMOVE_POLL":
      PollsCollection.doc(action.payload.id)
        .delete()
        .then(() => console.log("successfully removed poll"));
      // CustomersCollection.doc(action.customer.id).delete();
      // return state.filter((customer) => customer.id !== action.customer.id);
      return state.filter((poll) => poll.id === action.payload.id);
    default:
      return state.filter();
  }
};
