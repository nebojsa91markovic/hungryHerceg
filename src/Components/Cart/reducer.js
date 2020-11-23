const reducer = (state, action) => {

    switch (action.type) {
        case 'CLEAR_CART':
            return { ...state, cart: [] };

        case 'REMOVE':
            return { ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload) };

        case 'GET_TOTALS':
            let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal;
                cartTotal.amount += amount;
                return cartTotal;

            }, { total: 0, amount: 0 });

            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount };

    }

    return state;
};

export default reducer;