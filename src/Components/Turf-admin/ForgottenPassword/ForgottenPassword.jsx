import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FPEmailReqApi, FPOtpReqApi, FPSetResApi } from "../../../API/Services/TurfAdminRequest";
import EmailComponent from "./Components/EmailComponent";
import OtpComponent from "./Components/OtpComponent";
import ForgetPasswordPage from "./Components/ForgotPasswordComponent";

function ForgetPasswordMainComponent() {
    const navigate = useNavigate();
    const [emailModal, setEmailModal] = useState(true);
    const [otpModal, setOtpModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [phoneNum, setPhoneNum] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await FPEmailReqApi({ email: email });
        setPhoneNum(response.data.result.phone);
        const phone = response.data.result.phone.toString();
        const replaced = phone.slice(0, 2) + phone.slice(2).replace(/.(?=...)/g, "*");
        toast.success(`${response.data.msg} to ${replaced}`);
        setUserEmail(response.data.result.email);
        setEmailModal(false);
        setOtpModal(true);
    };

    const handleOTP = async (e) => {
        e.preventDefault();
        const values = Object.values(otp);
        const otpValue = values.join("");
        const response = await FPOtpReqApi({ otpValue, phoneNum });
        console.log(response);
        if (response.status === 201) {
            toast.success("O T P success");
            setEmailModal(false);
            setOtpModal(false);
        }
        setPasswordModal(true);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password.confirmPassword !== password.password) {
            toast.warning("Password is not match");
        } else {
            const response = await FPSetResApi({ password, email, phoneNum });
            if (response.status === 201) {
                toast.success("Password changed");
                navigate("/turf-admin/login");
            }
        }
    };

    return (
        <div>
            {emailModal && <EmailComponent setEmail={setEmail} handleSubmit={handleSubmit} />}
            {otpModal && <OtpComponent otp={otp} setOtp={setOtp} handleOTP={handleOTP} />}
            {passwordModal && <ForgetPasswordPage setPassword={setPassword} handlePasswordSubmit={handlePasswordSubmit} />}
        </div>
    );
}

export default ForgetPasswordMainComponent;
