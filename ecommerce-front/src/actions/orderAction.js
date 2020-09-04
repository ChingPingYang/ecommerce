import axios from 'axios';

export const getOrders = (sort) => async dispatch => {
    let match = {
        sortBy: 'createdAt',
        order: 'desc'
    }
    switch(sort) {
        case "- Newest -":
            match = {
                sortBy: 'createdAt',
                order: 'desc'
            }
            break;
        case "- Oldest -":
            match = {
                sortBy: 'createdAt',
                order: 'asc'
            }
            break;
        case "- Price -":
            match = {
                sortBy: 'amount',
                order: 'desc'
            }
            break;
        default:
            break;
    }
    try {
        const res = await axios.get(`/api/order?sortBy=${match.sortBy}&order=${match.order}`);
        dispatch({ type: "GOT_ORDERS", payload: res.data});
    } catch(err) {
        console.log(err.response.data);
    }
}