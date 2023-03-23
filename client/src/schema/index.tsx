import * as yup from "yup";

export const searchSchema = yup.object().shape({
     keywords: yup.string().required("A keyword is required"),
     location: yup.string()
})

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

export const postSchema = yup.object().shape({
     title: yup.string(),
     description: yup.string(),
     location: yup.string(),
     experience: yup.string(),
})