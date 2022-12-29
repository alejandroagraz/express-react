import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import Global from "../../config/Global";
const uri = Global.API_BASE_URL
export const login = createAsyncThunk(
    'login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const resp =  await axios.post(`${uri}login`, {
                username,
                password
            });
            if (resp.data.data){
                const { access_token } = resp.data.data;
                return access_token;
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
