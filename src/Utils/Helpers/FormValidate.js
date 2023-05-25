export const FormValidate = (formData) => {
    const newErrors = {};

    const keys = Object.keys(formData);
    keys.map((key) => {
        if (!formData[key]) newErrors[key] = `${key} is required`;
        else if (key === "email") {
            return !/\S+@\S+\.\S+/.test(formData[key]) ? (newErrors[key] = "") : "Email is invalid";
        } else if (key === "phone") {
            return !/^\d{10}$/.test(formData.phone) ? (newErrors[key] = "Mobile Number must be 10 digits") : "";
        }
    });
    return newErrors;
};
