export const validateForm = (formData) => {
    const errors = {};
    if (!formData.firstName.trim()) {
        errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
        errors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid Email format";
    }
    if (!formData.department) {
        errors.department = "Department is required";
    }
    return errors;
};
