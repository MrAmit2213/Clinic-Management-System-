const initState = {
    userId: '',
    fName: '',
    lName: '',
    email: '',
    number: '',
    gender: '',
    image: '',
    isLoggedIn: false,
    user:''
};

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userId: action.userId, fName: action.fName, lName: action.lName, email: action.email, number: action.number, gender: action.gender, image: action.image, isLoggedIn: true, user:'user' }
        case 'USER_LOGOUT':
            return { ...state, userId: '', fName: '', lName: '', email: '', number: '', gender: '', image: '', isLoggedIn: false, user:'' }
        case 'ADMIN_LOGIN':
            return { ...state, userId: action.userId, fName: action.fName, lName: action.lName, email: action.email, number: action.number, gender: action.gender, image: action.image, isLoggedIn: true, user:'admin' }
        case 'ADMIN_LOGOUT':
            return { ...state, userId: '', fName: '', lName: '', email: '', number: '', gender: '', image: '', isLoggedIn: false, user:'' }
        default:
            return state;
    }
}

export default Reducer;