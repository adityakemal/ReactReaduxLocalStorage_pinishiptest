const initState = {
    username: 'admin',
    pass: 'secret',
    isAuth: false,
    posts : [],    
}

//set default localstorage
if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(initState.posts))
}
  

const rootReducer = (state = initState , action) =>{
    // console.log(action);
    if (action.type == 'EDIT_POST') {
        for (const i in state.posts) {
            if (state.posts[i].id == action.id) {
                console.log(state.posts[i]);
                state.posts[i].status = action.val === true? '1' : '0'
            }
        }
    }

    if (action.type == 'ADD_POST') {
        console.log(action,'act dari add post');
        return {
            // ...state,
            posts : [...state.posts, action.data]
        }
    }

  
    
    return state
}

export default rootReducer