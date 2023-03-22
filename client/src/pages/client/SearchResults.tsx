import { HiArrowUp } from "react-icons/hi2"
import Container from "../../components/client/Container"
import JobResultCard from "../../components/client/JobResultCard"
import JobSearchInput from "../../components/client/JobSearchInput"
import { useAppSelector } from "../../redux/store"
import { selectJobPosts } from "../../redux/jobPostSlice"
import { useEffect, useState } from "react"

export const SearchResults = () => {

     const [searchResults, setSearchResults] = useState<any[]>([]);

     // @ts-ignore
     const results: any | null = useAppSelector(selectJobPosts)

     useEffect(() => {
          setSearchResults(results?.payload)
          console.log(results?.payload);
          
     }, [results?.payload]);


     return (
          <div className="w-full flex flex-col justify-center">
               <Container>
                    {/* Search Input */}
                    <div className="py-5"><JobSearchInput /></div>
                    <div className="mt-10">
                         <h2 className="text-2xl font-semibold mb-1">WEB Developer Jobs</h2>
                         <p className="text-sm">3,017 WEB Developer Jobs</p>
                         <p className="text-sm">Jobs within 25 miles of Accra, AA</p>
                    </div>
                    <div className="w-[30%] mt-5">

                         {
                              searchResults.map((item) => (
                                   <JobResultCard key={item?.id} id={item?.id} r_id={item?.recruiter_id} title={item?.title} location={item?.location} experience={item?.experience} description={item?.description}/>
                              ))
                         }

                         {/* <JobResultCard />
                         
                         <JobResultCard /> */}
                    </div>
               </Container>
               <button className="fixed bottom-20 right-20 p-5 bg-[#277f6a] rounded-full text-white shadow-2xl drop-shadow-sm shadow-slate-500"
                    onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}
               >
                    <HiArrowUp />
               </button>
          </div>
     )
}
