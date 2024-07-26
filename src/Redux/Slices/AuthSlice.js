import { createSlice } from '@reduxjs/toolkit';





const initialState={
    Profile:{},
    isLogged:false,
    token:""
}

export const AuthSlice=createSlice({
    name:'UserAuthData',
    initialState,
    reducers:{
        setLoggin:(state,action)=>{
            state.isLogged=true;
            state.token=action.payload
        },
        logOut:(state,action)=>{
            state.isLogged=false;
            state.Profile={};
            state.token=""
        },
        setProfile:(state,action)=>{
            state.Profile=action.payload.data,
            state.isLogged=true
            
        }
      
    },
  
})

export const {setLoggin,logOut,setProfile}=AuthSlice.actions