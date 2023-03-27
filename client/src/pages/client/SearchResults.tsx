import { HiArrowUp, HiOutlineBuildingOffice2, HiXCircle } from "react-icons/hi2"
import Container from "../../components/client/Container"
import JobResultCard from "../../components/client/JobResultCard"
import JobSearchInput from "../../components/client/JobSearchInput"
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { searchJobPosts, selectJobPosts } from "../../redux/jobPostSlice"
import { useEffect, useState } from "react"
import Loader from "../../assets/Loader";
import { MdVerified } from "react-icons/md";

export const SearchResults = () => {
     const [loading, setloading] = useState(true);
     const [searchResults, setSearchResults] = useState<any[]>([]);
     const dispatch =  useAppDispatch()

     const search = new URLSearchParams(window.location.search)
     const keywords = search.get('keywords')
     const location = search.get('location')

     const results: any | null = useAppSelector(selectJobPosts)

     useEffect(() => {  

          const storedResults = localStorage.getItem('searchResults');
          if (storedResults) {
               setSearchResults(JSON.parse(storedResults));
               setloading(false)
          }
          
     }, [results?.payload]);

     useEffect(() => {
          const searchQuery = async(keywords:string|null, location:string|null) => {
               try {
                    const query = await dispatch(searchJobPosts({keywords:keywords||'', location: location||''}))
                    // @ts-ignore
                    setSearchResults(query.payload?.payload)
                    setloading(false)
               } catch (error) {
                    console.error(error);
               }
          }
          searchQuery(keywords, location)
     }, [keywords, location]);

     
     return (
          <div className="w-full flex flex-col justify-center">
               <Container>
                    {/* Search Input */}
                    <div className="py-5"><JobSearchInput /></div>
                    
                    {
                         loading ?
                         <div className="flex items-center h-[60vh]">
                              <Loader /> 
                         </div>
                         :

                         
                         <>
                              <div className="mt-10">
                                        <h2 className="text-2xl font-semibold mb-1">Results for: {keywords}</h2>
                                        <p className="text-sm">Jobs at {location === '' ? 'every location': 'location'}</p>
                                   </div>
                                   <div className="w-[30%] mt-5">
                                   {
                                        searchResults.length!==0 ?
                                        <>
                                             {
                                                  searchResults.map((item) => (
                                                       <JobResultCard key={item?.id} id={item?.id} r_id={item?.recruiter_id} title={item?.title} location={item?.location} experience={item?.experience} description={item?.description}/>
                                                  ))
                                             }
                                        </>:
                                        <div className="border p-10 rounded-xl text-black mb-2 bg-white shadow-md">
                                             <div className="flex flex-col items-center justify-center">
                                                  <HiXCircle color='#b02621' size={50} />
                                                  <h2 className="text-xl font-bold text-center mt-4">No jobpost found</h2>
                                             </div>

                                        </div>

                                   }
                              </div>
                         </>
                    }



                    
               </Container>
               <button className="fixed bottom-20 right-20 p-5 bg-[#277f6a] rounded-full text-white shadow-2xl drop-shadow-sm shadow-slate-500"
                    onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}
               >
                    <HiArrowUp />
               </button>
          </div>
     )
}
