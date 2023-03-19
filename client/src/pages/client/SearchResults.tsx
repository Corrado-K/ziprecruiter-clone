import Container from "../../components/Container"
import JobResultCard from "../../components/JobResultCard"
import JobSearchInput from "../../components/JobSearchInput"

export const SearchResults = () => {
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
                    <div className="w-[30%] mt-5 space-y-2">
                         <JobResultCard />
                         <JobResultCard />
                    </div>
               </Container>
               
          </div>
     )
}
