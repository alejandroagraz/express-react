import { createSlice } from '@reduxjs/toolkit'
import { getFiles, getFile } from './fileAction'
const initialState = {
    loading: false,
    files: null,
    error: null,
    success: false,
}
const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {},
    extraReducers: {
        // list files
        [getFiles.pending]: (state) => {
            state.loading = 'Loading...'
            state.error = null
        },
        [getFiles.fulfilled]: (state, { payload }) => {
            state.loading = null
            state.error = null
            state.success = true
            state.files = payload
        },
        [getFiles.rejected]: (state, { payload }) => {
            state.loading = null
            state.error = payload
        },
        // search file
        [getFile.pending]: (state) => {
            state.loading = 'Loading...'
            state.error = null
        },
        [getFile.fulfilled]: (state, { payload }) => {
            state.loading = null
            state.error = null
            state.files = payload
        },
        [getFile.rejected]: (state, { payload }) => {
            state.loading = null
            state.error = payload
        },
    },
})
export default fileSlice.reducer
