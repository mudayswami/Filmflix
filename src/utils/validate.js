
const validate = (email, password) => {
    var email_regex     =   /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var password_regex  =   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const validemail    =   email_regex.test(email.current.value);
    const validpassword =   password_regex.test(password.current.value);
    
    if(!validemail ){
        return "Email not Valid";
    }else if(!validpassword){
        return "Password not Valid";
    }
    return null;
}

export default validate;