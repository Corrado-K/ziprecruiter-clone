import { useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { searchJobPosts } from '../../redux/jobPostSlice';
import { useAppDispatch } from '../../redux/store';
import { useFormik } from 'formik';
import { searchSchema } from '../../schema';

const JobSearchInput = () => {

     const navigator = useNavigate()

     const dispatch = useAppDispatch()

     const formik = useFormik({
          initialValues: {
               keywords: "",
               location: "",
          },
          onSubmit: async (values) => {
               try {
                    const data = await dispatch(searchJobPosts({keywords:values.keywords, location: values.location}))
                    // @ts-ignore
                    localStorage.setItem('searchResults', JSON.stringify(data.payload?.payload));
               } catch (error) {
                    console.error(error);
               }
               navigator(`/search-results?keywords=${values.keywords}&location=${values.location}`)
          },
          validationSchema: searchSchema,
     })

     return (
          <div className="space-x-2">
               <form className='flex space-x-2' onSubmit={formik.handleSubmit}>
                    <div className="relative mt-1">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <HiMagnifyingGlass className="w-5 h-5 text-gray-500" />
                         </div>
                         <input type="text" className={`bg-gray-50 border  text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-4
                              ${ formik.touched && formik.errors.keywords ? 'border-red-500': 'border-gray-300'}
                         `} placeholder="Search title or keyword"
                              name="keywords"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.keywords}
                         />
                    </div>
                    <div className="relative mt-1">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <HiOutlineLocationMarker className="w-5 h-5 text-gray-500" />
                         </div>
                         <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-4" placeholder="City, state or postal code"
                              name="location"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.location}
                         />
                    </div>
                    <button type='submit' className="px-10 bg-[#1a7460] text-white rounded-full">Search Jobs</button>
               </form>
               <p className='text-red-500 text-sm'>{formik.errors.keywords}</p>
              </div>
     )
}

export default JobSearchInput