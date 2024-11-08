import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    allAppliedJobs:[],
    searchText:"",
    filterText:""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs:(state,action)=>{
      state.allAppliedJobs=action.payload;
    },
    setSearchText:(state,action)=>{
      state.searchText=action.payload;
    },
    setfilterText:(state,action)=>{
      state.filterText=action.payload;
    }
  },
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText,setAllAppliedJobs ,setSearchText,setfilterText} =
  jobSlice.actions;
export default jobSlice.reducer;
