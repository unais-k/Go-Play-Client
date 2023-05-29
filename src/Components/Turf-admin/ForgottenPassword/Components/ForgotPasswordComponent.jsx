import React, { useState } from "react";

function ForgetPasswordPage({ handlePasswordSubmit, setPassword }) {
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput] = useState({
        password: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (event) => {
        const passwordInputValue = event.target.value.trim();
        const passwordInputFieldName = event.target.name;
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue };
        setPasswordInput(NewPasswordInput);
    };

    const handleValidation = (event) => {
        const passwordInputValue = event.target.value.trim();
        const passwordInputFieldName = event.target.name;
        //for password
        if (passwordInputFieldName === "password") {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{7,}/;
            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            }
            // else if (!uppercasePassword) {
            //     errMsg = "At least one Uppercase";
            // } else if (!lowercasePassword) {
            //     errMsg = "At least one Lowercase";
            // } else if (!digitsPassword) {
            //     errMsg = "At least one digit";
            // } else if (!specialCharPassword) {
            //     errMsg = "At least one Special Characters";
            // }
            // else if (!minLengthPassword) {
            //     errMsg = "At least minimum 8 characters";
            // }
            else {
                errMsg = "";
            }
            setPasswordErr(errMsg);
        }
        // for confirm password
        if (
            passwordInputFieldName === "confirmPassword" ||
            (passwordInputFieldName === "password" && passwordInput.confirmPassword.length > 0)
        ) {
            if (passwordInput.confirmPassword !== passwordInput.password) {
                setConfirmPasswordError("Confirm password is not matched");
            } else {
                setConfirmPasswordError("");
            }
        }
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue };
        setPasswordInput(NewPasswordInput);
        setPassword(passwordInput);
    };

    return (
        <div className="">
            <div className=" h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24 ">
                        <p className="text-center text-sm text-gray-500 font-light"> Change your password </p>
                        <form className="mt-6" onSubmit={(e) => handlePasswordSubmit(e)}>
                            <div className="relative mt-3">
                                <PasswordInputField
                                    handleValidation={handleValidation}
                                    handlePasswordChange={handlePasswordChange}
                                    passwordValue={passwordInput.password}
                                    passwordError={passwordError}
                                />
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative mt-3">
                                <ConfirmPasswordInputField
                                    handleValidation={handleValidation}
                                    handlePasswordChange={handlePasswordChange}
                                    confirmPasswordValue={passwordInput.confirmPassword}
                                    confirmPasswordError={confirmPasswordError}
                                />
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-8">
                                <button
                                    type="submit"
                                    className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-between mt-5">
                            <p className="text-start text-sm text-gray-500 font-light">
                                <a className="text-green-400">Cancel</a>
                            </p>
                            {/* <p className="text-end text-sm text-gray-500 font-light">
                                    <a className="text-green-400" onClick={handleChanges}>
                                        Save
                                    </a>{" "}
                                    Changes?
                                </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;

function PasswordInputField({ handleValidation, handlePasswordChange, passwordValue, passwordError }) {
    return (
        <>
            <div className="">
                <input
                    type="password"
                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    onKeyUp={handleValidation}
                    name="password"
                    placeholder="Password"
                />
                <p className="text-danger">{passwordError}</p>
            </div>
        </>
    );
}

function ConfirmPasswordInputField({ handleValidation, handlePasswordChange, confirmPasswordValue, confirmPasswordError }) {
    return (
        <>
            <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="password"
                value={confirmPasswordValue}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="confirmPassword"
                placeholder="Confirm Password"
            />
            <p className="text-danger">{confirmPasswordError}</p>
        </>
    );
}
