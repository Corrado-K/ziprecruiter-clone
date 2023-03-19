import * as yup from "yup";

export const loginSchema = yup.object().shape({
     email: yup.string().email(),
     password: yup.string()
})

export const registerSchema = yup.object().shape({
     fname: yup.string(),
     lname: yup.string(),
     email: yup.string().email(),
     password: yup.string(),

})