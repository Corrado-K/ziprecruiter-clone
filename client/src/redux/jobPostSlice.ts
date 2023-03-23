import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios.utils';
import { IJobPost } from '../interface';
import { RootState } from './store';


interface IJobPostState {
     error: string | null
     status: 'idle' | 'loading' | 'failed' | 'loaded'
     jobPosts: IJobPost[] | null
     jobPostDetails: IJobPost | null
}
   
const initialState: IJobPostState = {
     error: null,
     status: 'idle',
     jobPosts: null,
     jobPostDetails: null
}


const jobPostSlice = createSlice({
     name: 'jobPost',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
          
               .addCase(searchJobPosts.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.jobPosts = action.payload
                    state.status = 'loaded'
               })
               .addCase(searchJobPosts.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching for job posts'
                    state.status = 'failed'
               })

               .addCase(fetchMyJobPosts.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.jobPosts = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchMyJobPosts.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching your job post'
                    state.status = 'failed'
               })

               .addCase(fetchJobPostById.fulfilled, (state,action) => {
                    // @ts-ignore
                    state.jobPosts = action.payload
                    state.status = 'loaded'
               })
               .addCase(fetchJobPostById.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while searching job post by id'
                    state.status = 'failed'
               })

               .addCase(addJobPost.fulfilled, (state) => {
                    // @ts-ignore
                    state.status = 'idle'
               })
               .addCase(addJobPost.rejected, (state) => {
                    state.error = 'Error while adding job posts'
                    state.status = 'failed'
               })

               .addCase(updateJobPost.fulfilled, (state) => {
                    state.status = 'idle'
               })
               .addCase(updateJobPost.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while updating job post'
                    state.status = 'failed'
               })

               .addCase(deleteJobPost.fulfilled, (state,action) => {
                    state.status = 'idle'
               })
               .addCase(deleteJobPost.rejected, (state,action) => {
                    state.error = action.error.message ?? 'Error while deleting for job post'
                    state.status = 'failed'
               })
          

          builder
               .addMatcher(
                    isAnyOf(
                         searchJobPosts.pending,
                         fetchMyJobPosts.pending,
                         fetchJobPostById.pending,
                         addJobPost.pending,
                         updateJobPost.pending,
                         deleteJobPost.pending,
                    ), 
                    (state) => {
                         state.status = "loading"
                    }
               )
     },

})

export default jobPostSlice.reducer

export const selectJobPosts = (state: RootState) => state.jobPost.jobPosts
export const selectJobPostsStatus = (state: RootState) => state.jobPost.status
export const selectJobPostsDetails = (state: RootState) => state.jobPost.jobPostDetails
export const selectJobPostsError = (state: RootState) => state.jobPost.error


export const searchJobPosts = createAsyncThunk('searchJobPosts', async (obj: { keywords: string, location: string }) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'POST', url: '/jobsearch', data: { keywords: obj.keywords, location: obj.location}
     })
     return data
})

export const fetchMyJobPosts = createAsyncThunk('fetchMyJobPostById', async (id: string|undefined) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'GET', url: `/posts/${id}`
     })
     return data
})

export const fetchJobPostById = createAsyncThunk('fetchJobPostById', async (id: string|undefined) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'GET', url: `/posts/${id}`
     })
     return data
})

export const addJobPost = createAsyncThunk('addJobPost', async (obj: { title: string, description: string, location: string, experience:string }) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'POST', url: `/posts`, data: { title: obj.title, description: obj.description, location: obj.location, experience: obj.experience  }
     })
     return data
})

export const updateJobPost = createAsyncThunk('updateJobPost', async (obj: { id:string, title: string, description: string, location: string, experience:string }) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'PUT', url: `/posts/${obj.id}`, data: { title: obj.title, description: obj.description, location: obj.location, experience: obj.experience  }
     })
     return data
})

export const deleteJobPost = createAsyncThunk('deleteJobPost', async (id: string) => {
     const { data } = await axiosInstance<IJobPost>({
          method: 'DELETE', url: `/posts/${id}`
     })
     return data
})

