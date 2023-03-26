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

               .addCase(fetchMyapplications.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.applications = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchMyapplications.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching your job post'
                    state.status = 'failed'
               })

               .addCase(fetchapplicationById.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.applications = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchapplicationById.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching job post by id'
                    state.status = 'failed'
               })

               .addCase(addapplication.fulfilled, (state) => {
                    // @ts-ignore
                    state.status = 'idle'
               })
               .addCase(addapplication.rejected, (state) => {
                    state.error = 'Error while adding job posts'
                    state.status = 'failed'
               })

               .addCase(updateapplication.fulfilled, (state) => {
                    state.status = 'idle'
               })
               .addCase(updateapplication.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while updating job post'
                    state.status = 'failed'
               })

               .addCase(deleteapplication.fulfilled, (state,action) => {
                    state.status = 'idle'
               })
               .addCase(deleteapplication.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while deleting for job post'
                    state.status = 'failed'
               })
          

          builder
               .addMatcher(
                    isAnyOf(
                         fetchMyapplications.pending,
                         fetchapplicationById.pending,
                         addapplication.pending,
                         updateapplication.pending,
                         deleteapplication.pending,
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



export const fetchMyapplications = createAsyncThunk('fetchMyapplications', async (id: string|undefined) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'GET', url: `/application/myapplications`
     })
     return data
})

export const fetchapplicationById = createAsyncThunk('fetchapplicationById', async (id: string|undefined) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'GET', url: `/application/${id}`
     })
     return data
})

export const addapplication = createAsyncThunk('addapplication', async (obj: { title: string, description: string, location: string, experience:string }) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'POST', url: `/application`, data: { title: obj.title, description: obj.description, location: obj.location, experience: obj.experience  }
     })
     return data
})

export const updateapplication = createAsyncThunk('updateapplication', async (obj: { id:string, title: string, description: string, location: string, experience:string }) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'PUT', url: `/application/${obj.id}`, data: { title: obj.title, description: obj.description, location: obj.location, experience: obj.experience  }
     })
     return data
})

export const deleteapplication = createAsyncThunk('deleteapplication', async (id: string) => {
     const { data } = await axiosInstance<IApplication>({
          method: 'DELETE', url: `/application/${id}`
     })
     return data
})

