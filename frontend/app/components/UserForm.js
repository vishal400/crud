"use client";

import { useState } from "react";
import { TextField, Button, Alert, Paper } from "@mui/material";

const UserForm = ({
    initialData = { user: "", interest: [], age: "", mobile: "", email: "" },
    onSubmit,
    submitError,
    isEmailReadOnly = false,
}) => {
    const [formData, setFormData] = useState({
        user: initialData.user,
        interest: initialData.interest.join(","),
        age: initialData.age,
        mobile: initialData.mobile,
        email: initialData.email,
    });
    const [errors, setErrors] = useState({});
    console.log(formData);

    const validateForm = () => {
        const errors = {};
        if (!formData.user.trim()) errors.user = "Name is required";
        if (!formData.interest.trim())
            errors.interest = "Interests are required";
        if (!formData.age) errors.age = "Age is required";
        if (!formData.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errors.mobile = "Mobile number must be exactly 10 digits";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }

        console.log(errors);
        return errors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit({
            ...formData,
            interest: formData.interest.split(","),
        });
    };

    return (
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
            {submitError && <Alert severity="error">{submitError}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    error={!!errors.user}
                    helperText={errors.user}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Interests (comma separated)"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    error={!!errors.interest}
                    helperText={errors.interest}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mobile"
                    name="mobile"
                    type="number"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: isEmailReadOnly,
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    margin="normal"
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export default UserForm;
