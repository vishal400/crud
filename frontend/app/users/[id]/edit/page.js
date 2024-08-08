"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import UserForm from "../../../components/UserForm";

const EditUser = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';
    const router = useRouter();
    const { id } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            // get user details and udpate initialData
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            setInitialData(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setSubmitError("Error fetching user details");
        }
    };

    if(!initialData) fetchUser();

    const handleSubmit = (formData) => {
        // update user details
        setLoading(true);
        axios
            .put(`${BASE_URL}/users/${id}`, formData)
            .then(() => {
                router.push("/users");
                router.refresh();
            })
            .catch((error) => setSubmitError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
                Edit User
            </Typography>
            {initialData ? (
                <>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <UserForm
                            initialData={initialData}
                            onSubmit={handleSubmit}
                            submitError={submitError}
                            isEmailReadOnly
                        />
                    )}
                </>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
};

export default EditUser;
