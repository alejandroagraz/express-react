import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Global from "../../config/Global";
const uri = Global.API_BASE_URL

export const getFiles = createAsyncThunk(
    'file/list',
    async (arg, {getState, rejectWithValue }) => {
        try {
            const { login } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${login.userToken}`,
                },
            }
            const resp =  await axios.get( `${uri}secret/files`,
                config
            );
            if (resp.data.data){
                return resp.data.data;
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
);
export const getFile = createAsyncThunk(
    'file/search',
    async ({ search }, { getState, rejectWithValue }) => {
        try {
            const { login } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${login.userToken}`,
                },
            }
            const resp =  await axios.get( `${uri}secret/file/${search}`,
                config
            );
            if (resp.data.data){
                return resp.data.data;
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
);