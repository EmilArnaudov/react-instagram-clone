export function emailValidator(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

export function passwordValidator(password) {
    return password.length > 5;
}