import PollsCollection from "../collections/PollsCollection";
import firebase from "firebase/app";

export const PollsReducer = (state, action) => {
  console.log(state, action.payload, 111);
  switch (action.type) {
    case "ALL_POLLS":
      return action.payload.allPolls;
    case "ADD_POLL":
      console.log(state, action, 222);

      PollsCollection.doc(action.payload.id)
        .add(action.payload)
        .then(() => console.log("usepsno dodat poll"));
      return [...state, action.payload];
    case "ADDVOTE_POLL":
      console.log(state, action, 333);
      console.log("prvo");

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
            console.log(action.payload.id);
            PollsCollection.doc(action.payload.id)
              .update({
                restaurants: prevState,
                voters: firebase.firestore.FieldValue.arrayUnion(action.userId),
              })
              .then(() => {
                console.log("voted");
              });
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
      PollsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arrAllPolls.push(doc.payload());
        });
      });
      return arrAllPolls;

    case "FINISHED_POLL":
      console.log(action.payload);
      PollsCollection.doc(action.payload.id)
        .get()
        .then((response) => {
          if (response.data().createBy === action.payload.createBy) {
            PollsCollection.doc(action.payload.id).update({
              active: false,
            });
            alert("zavrseno");
          } else alert("nisi admin");
        });

      let prevState = [...state];
      console.log([...state], prevState);
      let newState = [...state].filter(
        (poll) => poll.id === action.payload.id
      )[0];
      console.log(newState);
      let index = prevState.indexOf(newState);

      newState.active = false;
      prevState[index] = newState;
      // let newState = prevState.filter(prev => prev.)
      console.log(index);
      console.log(prevState);
      return prevState;
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
