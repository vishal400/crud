"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, CircularProgress } from "@mui/material";
import UserForm from "../../components/UserForm";

const AddUser = () => {
    const router = useRouter();

    // initialise states
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (formData) => {
        const BASE_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api'
        setLoading(true);

        // call api to create new user
        axios
            .post(`${BASE_URL}/users`, formData)
            .then(() => {
                console.log("user added");
                router.push("/users");
                router.refresh();
            })
            .catch((error) => setSubmitError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
                Add User
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <UserForm onSubmit={handleSubmit} submitError={submitError} />
            )}
        </Container>
    );
};

export default AddUser;
