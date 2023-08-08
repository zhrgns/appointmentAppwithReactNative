export default function (errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi";

        case "auth/email-already-in-use":
            return "Kullanıcı zaten kayıtlı";

        case "auth/user-not-found":
            return "Kullanıcı bulunamadı";

        case "auth/wrong-password":
            return "Parola geçersiz";

        case "auth/weak-password":
            return "Parola çok zayıf";

        case "auth/admin-restricted-operation":
            return "Form boş bırakılamaz";

        case "auth/missing-password":
            return "Parola boş bırakılamaz";
            
        default:
            return errorCode;
    }
}
