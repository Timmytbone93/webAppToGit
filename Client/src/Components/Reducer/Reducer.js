const intialState = {
    isAuthenticated:null,
    user: null,
    successMsg:null,
    errorMsg:null,
    redirect:false
}

const Reducer = (state = intialState, action) => {
    if(action.type === 'ADDUSERINFO'){
        return{
            ...state,
            user: action.user
        }
    }
    /*if(action.type === 'MODIFYUSERSESSION'){
        return{
            ...state,
            user: {
                ...state.user,
                [action.name]:action.value
            }
        }
    }*/
    if(action.type === 'FLIPAUTHENTICATION'){
        return{
            ...state,
            isAuthenticated:action.value
        }
    }


    return state;
};

export default Reducer