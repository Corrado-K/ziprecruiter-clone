
import * as yup from 'yup'

export const registrationSchema = yup.object({
     body: yup.object({
          fname: yup.string().required('First name is required'),
          lname: yup.string().required('Last name is required'),
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required')
     })
})

export const loginSchema = yup.object({
     body: yup.object({
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required')
     })
})

export const postSchema = yup.object({
     body: yup.object({
          title: yup.string().required('Title of job post is required'),
          description: yup.string().required('Detailed Job description is required'),
          location: yup.string().required('Location is required'),
          experience: yup.string().required('Experience level is required')
     })
})

// export const applicationSchema = yup.object({
//      body: yup.object({
//           title: yup.string().required('Title of job post is required'),
//           description: yup.string().required('Detailed Job description is required'),
//           location: yup.string().required('Location is required'),
//           experience: yup.string().required('Experience level is required')
//      })
// })