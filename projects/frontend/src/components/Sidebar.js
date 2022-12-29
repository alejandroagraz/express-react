import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form';
import {getFiles, getFile} from '../features/file/fileAction'
function Sidebar() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loading, error } = useSelector((state) => state.file)
    const dispatch = useDispatch()
    const onSubmit = async (data, e) => {
        dispatch(getFile(data))
        e.target.reset();
    }
    const viewMessage = (message) => {
        return(
            <div className="text-danger">
                <p>{message}</p>
            </div>
        )
    }
    return (
        <aside className="sidebar">
            <div className="sidebar-item">
                <h3>Searcher</h3>
                <div className="mt-3">
                    {loading && viewMessage(loading)}
                    {error && viewMessage(error)}
                </div>
                <p className="mt-3">Find your file</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter name file"
                            {...register("search", {
                                required: "Please enter your text",
                            })}/>
                        {
                            errors.search &&
                            <div className="text-danger" >
                                {errors.search.message}
                            </div>
                        }
                    </div>

                    <div className="input-group mt-3">
                        <input
                            type="submit"
                            className="btn btn-success"
                            value="Search"
                        />
                        <input
                            type="button"
                            className="btn btn-warning"
                            value="Clean"
                            onClick={() => dispatch(getFiles())}
                        />
                    </div>
                </form>
            </div>
        </aside>
    );
}
export default Sidebar;