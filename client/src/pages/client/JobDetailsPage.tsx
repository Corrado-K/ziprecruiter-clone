import { Outlet, useParams } from 'react-router-dom';
import JobDetailsCard from "../../components/client/JobDetailsCard"
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchJobPostById, selectJobPosts } from '../../redux/jobPostSlice';

const JobDetailsPage = () => {

     const [jobDetails, setJobDetails]= useState()
     const {jid} = useParams()

     const dispatch = useAppDispatch()

     useEffect(() => {
          const fetchJobPost = async (jid:string|undefined) => {
               const data = await dispatch(fetchJobPostById(jid))
               // @ts-ignore
               setJobDetails(data?.payload.payload)
          }
          fetchJobPost(jid).catch(console.error);
     }, [jid]);

     
     

     return (
          <div className="w-full flex flex-col items-center justify-center pt-[2%]">
               {/* @ts-ignore */}
               <JobDetailsCard id={jobDetails?.id} title={jobDetails?.title} location={jobDetails?.location} experience={jobDetails?.experience} description={jobDetails?.description} />     
               <Outlet />        
          </div>
     )
}

export default JobDetailsPage