console.log("test 1");

let svirestorani = [];

axios
  .get(
    "https://api.documenu.com/v2/restaurants/state/CA?key=0e74898f8fa8502fbc350e289b3ce423"
  )
  //vraca restorane
  .then((response) => {
    let resData = response.data.data;

    let array = [];

    //console.log(resData[0]);

    resData.forEach((data) => {
      let obj = {};

      // {address: data.address.formatted, id: data.restaurant_id, name: data.restaurant_name}
    });

    resData.map((data) => {
      //console.log(data);

      let array = [];

      const resId = data.restaurant_id;

      //console.log("test", response.data);
      const id = response.data.id;

      axios
        .get(
          `https://api.documenu.com/v2/restaurant/${resId}/menuitems?key=0e74898f8fa8502fbc350e289b3ce423`
        )
        .then((response) => {
          console.log("test 3");
          console.log(response.data.data);
          response.data.data.map((mealInfo) => {
            const meal = {
              name: mealInfo.menu_item_name,
              title: mealInfo.menu_item_name,
              price: mealInfo.menu_item_price,
              available: Math.random() > 0.2 ? true : false,
              category: mealInfo.subsection,
              desc: mealInfo.menu_item_description,
              id: uuidv4(),
              img: "",
            };

            console.log(meal);
            array.push(meal);
          });
        });
      setTimeout(() => {
        console.log(array);

        const info = {
          name: data.restaurant_name,
          address: data.address.formatted,
          allMeals: array,
          created: moment().format(),
          id: uuidv4(),
        };
        svirestorani.push(info);
      }, 7000);
    });

    // https://api.documenu.com/v2/restaurant/4068705373999617/menuitems

    //Loop za upis restorana u bazu - zavrseno

    // resData.map(data => {
    //     const info = {
    //         name: data.restaurant_name,
    //         address: data.address.street
    //     }

    //       const config = {
    //         headers: {
    //           "Authorization": "Bearer " + ApiKey
    //         }
    //         };

    //       axios.post(`${ApiBase}restaurants`, info, config)
    //       .then(response => {
    //         console.log('test', response.data)
    //       })
    //       .catch(err => console.log(err))

    // })
  })
  .catch((err) => console.log(err));

setTimeout(() => {
  console.log(svirestorani);

  svirestorani.forEach((restoran) => {
    RestaurantCollection.doc(restoran.id)
      .set({
        address: restoran.address,
        allMeals: restoran.allMeals,
        created: restoran.created,
        id: restoran.id,
        name: restoran.name,
      })
      .then("successful");
  });
}, 15000);
