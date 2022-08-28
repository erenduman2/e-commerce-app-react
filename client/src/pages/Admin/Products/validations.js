import { object,string, number, date, ref } from "yup";

const validations = object({
    title: string().required(),
    description: string().min(5).required(),
    price: string().required(),
})

export default validations;


