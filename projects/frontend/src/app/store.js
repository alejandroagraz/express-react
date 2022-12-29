import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from '../features/login/loginSlice'
import fileReducer from '../features/file/fileSlice'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import Global from "../config/Global";

const rootPersistConfig = {
    key: 'root',
    storage,
    devTools: Global.NODE_ENV !== 'production',
    stateReconciler: autoMergeLevel2
};

const userPersistConfig = {
    key: 'login',
    storage,
    whitelist: ['error', 'loading', 'success']
};

const filePersistConfig = {
    key: 'file',
    storage,
    whitelist: ['error', 'loading']
};

const appReducer = combineReducers({
    login: persistReducer(userPersistConfig, userReducer),
    file: persistReducer(filePersistConfig, fileReducer)
})

const rootReducer = (state, action) => {
    if (action.type === 'login/logout') {
        storage.removeItem('persist:root')
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)