import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import "../../styling/LoginForm.css"
import Google from "../../assets/images/GoogleLogo.png"
import { FaArrowRightLong } from "react-icons/fa6";


interface FormProps {
    route: string;
    method: "login" | "register"
}

const LoginForm: React.FC<FormProps> = ({ route, method }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const buttonText = (method === "login" ? "Login" : "Register")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {

        const data = {username,password}

        const res = await api.post(route, data)
        if (method ==="login"){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
            navigate("/chime")
        }
        
        else {
            navigate("/login")
        }
        }  catch (error:any) {
            alert("error occured: "+ error.message)

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='container'>
            <div className='form-label'>{buttonText}</div>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="form-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : <FaArrowRightLong />
                    }
                </button>
            </form>
            
            <div className='form-line'/>
            <button
                    className="form-google"
                >
                    <img className='logo' src={Google}/>
                    <div className='button-text'>{buttonText} with Google</div>

            </button>

        </div>
    )
}

export default LoginForm
