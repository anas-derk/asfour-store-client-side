import Head from "next/head";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import validations from "../../../public/global_functions/validations";
import Axios from "axios";

export default function UserLogin() {

    const [emailForLogin, setEmailForLogin] = useState("");

    const [passwordForLogin, setPasswordForLogin] = useState("");

    const [isLoginingStatus, setIsLoginingStatus] = useState(false);

    const [emailForSignup, setEmailForSignup] = useState("");

    const [passwordForSignup, setPasswordForSignup] = useState("");

    const [isSignupStatus, setIsSignupStatus] = useState(false);

    const [errMsg, setErrorMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [isVisiblePasswordForLogin, setIsVisiblePasswordForLogin] = useState(false);

    const [isVisiblePasswordForSignup, setIsVisiblePasswordForSignup] = useState(false);

    const router = useRouter();

    const userLogin = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        setErrorMsg("");
        setSuccessMsg("");
        let errorsObject = validations.inputValuesValidation([
            {
                name: "emailForLogin",
                value: emailForLogin,
                rules: {
                    isRequired: {
                        msg: "Sorry, This Field Can't Be Empty !!",
                    },
                    isEmail: {
                        msg: "Sorry, This Email Is Not Valid !!",
                    }
                },
            },
            {
                name: "passwordForLogin",
                value: passwordForLogin,
                rules: {
                    isRequired: {
                        msg: "Sorry, This Field Can't Be Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsLoginingStatus(true);
            try {
                const res = await Axios.get(`${process.env.BASE_API_URL}/users/login?email=${emailForLogin}&password=${passwordForLogin}`);
                const result = await res.data;
                setIsLoginingStatus(false);
                if (typeof result === "string") {
                    setErrorMsg(result);
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errorTimeout);
                    }, 5000);
                } else {
                    localStorage.setItem("asfour-store-user-id", result._id);
                    router.push("/");
                }
            } catch (err) {
                console.log(err);
                setIsLoginingStatus(false);
                setErrorMsg("Sorry, Someting Went Wrong, Please Try Again The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 5000);
            }
        }
    }

    const userSignup = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "emailForSignup",
                value: emailForSignup,
                rules: {
                    isRequired: {
                        msg: "Sorry, This Field Can't Be Empty !!",
                    },
                    isEmail: {
                        msg: "Sorry, This Email Is Not Valid !!",
                    }
                },
            },
            {
                name: "passwordForSignup",
                value: passwordForSignup,
                rules: {
                    isRequired: {
                        msg: "Sorry, This Field Can't Be Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsSignupStatus(true);
            try {
                const res = await Axios.post(`${process.env.BASE_API_URL}/users/create-new-user`, {
                    email: emailForSignup,
                    password: passwordForSignup,
                });
                const result = await res.data;
                setIsSignupStatus(false);
                if (result === "Sorry, Can't Create User Because it is Exist !!!") {
                    setErrorMsg(result);
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errorTimeout);
                    }, 2000);
                } else {
                    setSuccessMsg(result);
                    let successTimeout = setTimeout(() => {
                        setSuccessMsg("");
                        clearTimeout(successTimeout);
                    }, 5000);
                }
            } catch (err) {
                console.log(err);
                setErrorMsg("Sorry, Someting Went Wrong, Please Try Again The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
    }

    return (
        <div className="auth d-flex flex-column justify-content-center">
            <Head>
                <title>Asfour Store - User Auth</title>
            </Head>
            <Header />
            <div className="page-content text-white p-4 text-center">
                <div className="container-fluid">
                    {(errMsg || successMsg) && <p className={`result-auth-msg text-white text-start mb-5 p-3 alert ${errMsg ? "alert-danger bg-danger" : ""} ${successMsg ? "alert-success bg-success" : ""}`}>{errMsg || successMsg}</p>}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="signup-section ps-5">
                                <h3 className="part-name mb-4">Create New Account</h3>
                                <form className="user-signup-form mb-3" onSubmit={userSignup}>
                                    <div className="email-field-box">
                                        <input
                                            type="text"
                                            placeholder="Please Enter Your Email"
                                            className={`form-control p-3 border-2 ${formValidationErrors["emailForSignup"] ? "border-danger mb-2" : "mb-5"}`}
                                            onChange={(e) => setEmailForSignup(e.target.value.trim())}
                                        />
                                        <div className='icon-box text-dark'>
                                            <BiSolidUser className="icon" />
                                        </div>
                                    </div>
                                    {formValidationErrors["emailForSignup"] && <p className='error-msg text-danger'>{formValidationErrors["emailForSignup"]}</p>}
                                    <div className="password-field-box">
                                        <input
                                            type={isVisiblePasswordForSignup ? "text" : "password"}
                                            placeholder="Please Enter Your Password"
                                            className={`form-control p-3 border-2 ${formValidationErrors["passwordForSignup"] ? "border-danger mb-2" : "mb-5"}`}
                                            onChange={(e) => setPasswordForSignup(e.target.value.trim())}
                                        />
                                        <div className='icon-box text-dark'>
                                            {!isVisiblePasswordForSignup && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisiblePasswordForSignup(value => value = !value)} />}
                                            {isVisiblePasswordForSignup && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisiblePasswordForSignup(value => value = !value)} />}
                                        </div>
                                    </div>
                                    {formValidationErrors["passwordForSignup"] && <p className='error-msg text-danger'>{formValidationErrors["passwordForSignup"]}</p>}
                                    {!isLoginingStatus && !errMsg && <button type="submit" className="btn btn-success w-100 mb-4 p-3">
                                        <span className="me-2">Signup</span>
                                        <FiLogIn />
                                    </button>}
                                    {isLoginingStatus && <button disabled className="btn btn-primary w-100 mb-4">
                                        <span className="me-2">Wait Signup ...</span>
                                    </button>}
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="login-section ps-5">
                                <h3 className="part-name mb-4">Login</h3>
                                <form className="user-login-form mb-3" onSubmit={userLogin}>
                                    <div className="email-field-box">
                                        <input
                                            type="text"
                                            placeholder="Please Enter Your Email"
                                            className={`form-control p-3 border-2 ${formValidationErrors["emailForLogin"] ? "border-danger mb-2" : "mb-5"}`}
                                            onChange={(e) => setEmailForLogin(e.target.value.trim())}
                                        />
                                        <div className='icon-box text-dark'>
                                            <BiSolidUser className="icon" />
                                        </div>
                                    </div>
                                    {formValidationErrors["emailForLogin"] && <p className='error-msg text-danger'>{formValidationErrors["emailForLogin"]}</p>}
                                    <div className="password-field-box">
                                        <input
                                            type={isVisiblePasswordForLogin ? "text" : "password"}
                                            placeholder="Please Enter Your Password"
                                            className={`form-control p-3 border-2 ${formValidationErrors["passwordForLogin"] ? "border-danger mb-2" : "mb-5"}`}
                                            onChange={(e) => setPasswordForLogin(e.target.value.trim())}
                                        />
                                        <div className='icon-box text-dark'>
                                            {!isVisiblePasswordForLogin && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisiblePasswordForLogin(value => value = !value)} />}
                                            {isVisiblePasswordForLogin && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisiblePasswordForLogin(value => value = !value)} />}
                                        </div>
                                    </div>
                                    {formValidationErrors["passwordForLogin"] && <p className='error-msg text-danger'>{formValidationErrors["passwordForLogin"]}</p>}
                                    {!isLoginingStatus && !errMsg && <button type="submit" className="btn btn-success w-100 mb-4 p-3">
                                        <span className="me-2">Login</span>
                                        <FiLogIn />
                                    </button>}
                                    {isLoginingStatus && <button disabled className="btn btn-primary w-100 mb-4">
                                        <span className="me-2">Wait Loging ...</span>
                                    </button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}