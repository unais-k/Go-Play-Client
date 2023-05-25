import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainComponent({ handlePasswordSubmit, setPassword }) {
    const navigate = useNavigate();
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

    const handleBackButton = () => {
        navigate(-1);
    };

    const handleValidation = (event) => {
        const passwordInputValue = event.target.value.trim();
        const passwordInputFieldName = event.target.name;
        //for password
        if (passwordInputFieldName === "password") {
            const passwordLength = passwordInputValue.length;
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            } else {
                errMsg = "";
            }
        }
        // for confirm password
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue };
        setPasswordInput(NewPasswordInput);
        setPassword(passwordInput);
    };
    return (
        <div>
            <div className="text-lime-600 font-semibold text-2xl mb-5">Change Password</div>
            <div>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            id="floating_email"
                            value={passwordInput.password}
                            onChange={handlePasswordChange}
                            onKeyUp={handleValidation}
                            name="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            id=""
                            value={passwordInput.confirmPassword}
                            onChange={handlePasswordChange}
                            onKeyUp={handleValidation}
                            name="confirmPassword"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="bg-green-200 text-lime-600 uppercase text-xs font-bold px-3 rounded py-2"
                            onClick={handleBackButton}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="text-white bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainComponent;
