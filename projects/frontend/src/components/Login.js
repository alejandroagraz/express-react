import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/login/loginAction'
import { getFiles } from '../features/file/fileAction'
import UserIcon from '../assets/images/user_icon.png';
function Login() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loading, error, userToken } = useSelector((state) => state.login)
    const { files } = useSelector((state) => state.file)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken) {
            dispatch(getFiles())
            if (files)
                navigate('/home')
        }
    }, [navigate, userToken, files, dispatch])
    const onSubmit = async (data, e) => {
        dispatch(login(data))
        e.target.reset();
        // debugger
    };

    const viewMessage = (message) => {
        return(
            <div className="text-danger">
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div className="center text-center">
            <h2>Login </h2>
            <strong>Test</strong>React
            <div className="mt-3">
                {loading && viewMessage(loading)}
                {error && viewMessage(error)}
            </div>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-content">
                    <div className="imgcontainer">
                        <img src={UserIcon} alt="Avatar" className="avatar"/>
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            {...register("username", {
                                required: "Please check the Username",
                            })}
                        />
                        {
                            errors.username &&
                            <div className="text-danger" >
                                {errors.username.message}
                            </div>
                        }
                    </div>
                    <div className="form-group mt-5">
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Please enter your password",
                            })}
                        />
                        {
                            errors.password &&
                            <div className="text-danger" >
                                {errors.password.message}
                            </div>
                        }
                    </div>
                    <div className="d-inline-flex mt-5">
                        <button type="submit" className="btn btn-success">
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Login;