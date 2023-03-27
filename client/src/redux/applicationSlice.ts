import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios.utils';
import { IApplication } from '../interface';
import { RootState } from './store';


interface IApplicationState {
     error: string | null
     status: 'idle' | 'loading' | 'failed' | 'loaded'
     applications: IApplication[] | null
     applicationDetails: IApplication | null
}
   
const initialState: IApplicationState = {
     error: null,
     status: 'idle',
     applications: null,
     applicationDetails: null
}


const applicationSlice = createSlice({
     name: 'application',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
          
               // .addCase(searchapplications.fulfilled, (state,action) => {
               //      // @ts-ignore
               //      state.applications = action.payload
               //      state.status = 'loaded'
               // })
               // .addCase(searchapplications.rejected, (state,action) => {
               //      state.error = action.error.message ?? 'Error while searching for job posts'
               //      state.status = 'failed'
               // })

               .addCase(fetchRecruiterApplications.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.applications = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchRecruiterApplications.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching your job post'
                    state.status = 'failed'
               })

               .addCase(fetchMyApplications.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.applications = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchMyApplications.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching your job post'
                    state.status = 'failed'
               })

               .addCase(fetchApplicationById.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.applications = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchApplicationById.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching job post by id'
                    state.status = 'failed'
               })

               .addCase(addApplication.fulfilled, (state) => {
                    // @ts-ignore
                    state.status = 'idle'
               })
               .addCase(addApplication.rejected, (state) => {
                    state.error = 'Error while adding job posts'
                    state.status = 'failed'
               })

               .addCase(updateApplicationStatus.fulfilled, (state) => {
                    state.status = 'idle'
               })
               .addCase(updateApplicationStatus.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while updating job post'
                    state.status = 'failed'
               })

               .addCase(deleteApplication.fulfilled, (state,action) => {
                    state.status = 'idle'
               })
               .addCase(deleteApplication.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while deleting for job post'
                    state.status = 'failed'
               })
          

          builder
               .addMatcher(
                    isAnyOf(
                         fetchMyApplications.pending,
                         fetchRecruiterApplications.pending,
                         fetchApplicationById.pending,
                         addApplication.pending,
                         updateApplicationStatus.pending,
                         deleteApplication.pending,
                    ), 
                    (state) => {
                         state.status = "loading"
                    }
               )
     },

})

export default applicationSlice.reducer

export const selectapplications = (state: RootState) => state.application.applications
export const selectapplicationsStatus = (state: RootState) => state.application.status
export const selectapplicationsDetails = (state: RootState) => state.application.applicationDetails
export const selectapplicationsError = (state: RootState) => state.application.error



export const fetchRecruiterApplications = createAsyncThunk('fetchRecruiterApplications', async () => {
     const { data } = await axiosInstance<IApplication>({
          method: 'GET', url: `/application/received`
     })
     return data
})

export const fetchMyApplications = createAsyncThunk('fetchMyApplications', async () => {
     const { data } = await axiosInstance<IApplication>({
          method: 'GET', url: `/application/myapplications`
     })
     return data
})

export const fetchApplicationById = createAsyncThunk('fetchApplicationById', async (obj: { application_id: string }) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'GET',  url: `/application/myapplications/${obj.application_id}`
     })
     return data
})

export const addApplication = createAsyncThunk('addApplication', async (obj: { resume: File, jobpost_id: string }) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'POST', url: `/application`, data: { resume: obj.resume, jobpost_id: obj.jobpost_id },
          headers: {
               'Content-Type': 'multipart/form-data'
          }
     })
     return data
})

export const updateApplicationStatus = createAsyncThunk('updateApplicationStatus', async (obj: { id:string, status: string }) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'PUT', url: `/application/${obj.id}`, data: { status: obj.status  }
     })
     return data
})

export const deleteApplication = createAsyncThunk('deleteApplication', async (id: string) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'DELETE', url: `/application/${id}`
     })
     return data
})

