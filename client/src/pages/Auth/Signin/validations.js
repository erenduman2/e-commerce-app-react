import { object,string, number, date, ref } from "yup";

const validations = object({
    email: string().email("Geçerli bir email girin.").required("Zorunlu Alan."),
    password: string().min(5, "Parolanız en az 5 karakterli olmalı").required("Zorunlu Alan"),
})

export default validations;
