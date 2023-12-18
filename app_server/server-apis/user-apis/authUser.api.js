//HIGHLIGHT: KETABI USER authenticate API

/* API
@name: authenticate_user()
@description: authenticate the user and get token to save it locally.
@endpoint: POST "/u/auth/sign-in"
@route: "/u/auth/sign-in"
@params:
*/
function authenticate_user(req, res) {
    res.status(200).json({ msg: "user auth test" });
}

export default authenticate_user;
