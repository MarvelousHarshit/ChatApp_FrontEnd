
const getotheruserdetails = (users, curr_user_id) => {
    return (users[0]._id === curr_user_id ? users[1] : users[0])
}

const getLoggedUser = () => {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    // user ? console.log('Logged user : ', user) : console.log('Please login again')
    return user;
}

const getLocaltime = (updatedAt) => {
    updatedAt = new Date(updatedAt);
    updatedAt = updatedAt.toLocaleString();
    return updatedAt;

}

const getBaseUrlForServer = () => {
    return process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL_PROD : process.env.REACT_APP_API_BASE_URL_DEV

}


export { getotheruserdetails, getLoggedUser, getLocaltime, getBaseUrlForServer };