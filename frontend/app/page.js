import Link from "next/link";
import { Button } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <Button
                size="large"
                component={Link}
                href={`/users`}
                variant="contained"
                color="primary"
            >
                USERS LIST
            </Button>
        </main>
    );
}
