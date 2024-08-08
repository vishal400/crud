import { revalidatePath } from "next/cache";
import axios from "axios";
import Link from "next/link";
import { Container, Typography, Paper, Button, Grid } from "@mui/material";

const fetchUser = async (id) => {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api'

        // get user details
        const response = await axios.get(
            `${BASE_URL}/users/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

const UserDetail = async ({ params }) => {
    revalidatePath("/users/[id]");
    const user = await fetchUser(params.id);

    if (!user) {
        return (
            <Container>
                <Typography
                    variant="h4"
                    color="error"
                    align="center"
                    style={{ marginTop: "20px" }}
                >
                    Error fetching user details
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
                User Details
            </Typography>
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h5" component="div">
                    {user.user}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Interests: {user.interest.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: {user.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mobile: {user.mobile}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                </Typography>
            </Paper>
            <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: "20px" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={`/users/${user._id}/edit`}
                >
                    Edit User
                </Button>
            </Grid>
        </Container>
    );
};

export default UserDetail;
