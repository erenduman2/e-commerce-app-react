import { object,string, number, date, ref } from "yup";
// import { string } from "yup/lib/locale";

const validations = object({
    email: string().email("Geçerli bir email girin.").required("Zorunlu Alan."),
    password: string().min(5, "Parolanız en az 5 karakterli olmalı").required("Zorunlu Alan"),
    passwordConfirm: string().oneOf([ref("password")], "Girdiğiniz parolalar uyuşmuyor.").required("Zorunlu Alan"),
})

export default validations;
