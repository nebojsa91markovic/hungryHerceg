import React from 'react';
import ApiKey from "../../services/ApiKey/ApiKey"
import ApiBase from "../../services/ApiBase/ApiBase";
import axios from "axios";

const CreateRestaurantDatabase = () => {

    const config = {
        headers: {
          "Authorization": "Bearer " + ApiKey
        }
        }; 


        // NE PIPAJ BEZ PITANJA!!! =)))


    // const handleDatabaseCreate = () => {
    //     console.log('test 1')
    //     axios.get('https://api.documenu.com/v2/restaurants/state/CA?key=0e74898f8fa8502fbc350e289b3ce423')
    //     //vraca restorane
    //     .then(response => {
    //         let resData = response.data.data;
    //         console.log(resData)


    //         resData.map(data => {
    //             const info = {
    //                 name: data.restaurant_name,
    //                 address: data.address.street
    //             }

    //             const resId = data.restaurant_id;
                  
                  
                    
              
    //               axios.post(`${ApiBase}restaurants`, info, config)
    //               .then(response => {
    //                 console.log('test 2')

    //                 console.log('test', response.data)
    //                 const id = response.data.id;

                    
    //                 axios.get(`https://api.documenu.com/v2/restaurant/${resId}/menuitems?key=0e74898f8fa8502fbc350e289b3ce423`)
    //                 .then(response => {
    //                     console.log('test 3')

    //                     response.data.data.map(mealInfo => {
    //                         const meal = {
    //                             name: mealInfo.menu_item_name,
    //                             price: mealInfo.menu_item_price,
    //                             available: Math.random() > 0.3 ? true : false,
    //                         }

    //                         axios.post(`${ApiBase}restaurants/${id}/meals`, meal, config)
    //                         .then(response => console.log(response.data))



    //                     })


                        
    //                 })




    //               })
    //               .catch(err => console.log(err))

    //         })

    //         // https://api.documenu.com/v2/restaurant/4068705373999617/menuitems



    //         //Loop za upis restorana u bazu - zavrseno 

    //         // resData.map(data => {
    //         //     const info = {
    //         //         name: data.restaurant_name,
    //         //         address: data.address.street
    //         //     }
                  
    //         //       const config = {
    //         //         headers: {
    //         //           "Authorization": "Bearer " + ApiKey
    //         //         }
    //         //         }; 
                    
              
    //         //       axios.post(`${ApiBase}restaurants`, info, config)
    //         //       .then(response => {
    //         //         console.log('test', response.data)
    //         //       })
    //         //       .catch(err => console.log(err))

    //         // })



    //     })
    //     .catch(err => console.log(err))
    // }


    return (
        <button >Upisi Restorane</button>
    );
}
 
export default CreateRestaurantDatabase;