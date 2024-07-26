import { createSlice } from '@reduxjs/toolkit';





const initialState={
    IndividualBlog:{},
    AllBlogs:[],
    blogUpdate:false,
    blogDeleted:false,
}

export const BlogSlice=createSlice({
    name:'BlogData',
    initialState,
    reducers:{
        FetchAllBlog:(state,action)=>{
          state.FetchAllBlog=action.payload
        },
        FetchIndiv:(state,action)=>{
            state.IndividualBlog=action.payload
        },
        EditedBlog:(state,action)=>{
            state.blogUpdate=true
        },
        deletedBlog:(state,action)=>{
            state.deletedBlog=true
        }
      
    },
  
})

export const {FetchAllBlog,FetchIndiv,EditedBlog,deletedBlog}=BlogSlice.actions