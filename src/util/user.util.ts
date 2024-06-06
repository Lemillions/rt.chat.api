export class UserUtils {
    static REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,20}$/;
    static REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

    static isPasswordValid(password: string) {
        const regex = new RegExp(UserUtils.REGEX_PASSWORD);
        return regex.test(password);
    }
    
    static isEmailValid(email: string) {
        const regex = new RegExp(UserUtils.REGEX_EMAIL);
        return regex.test(email);
    }
}