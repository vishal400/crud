import Link from 'next/link';
import axios from 'axios';
import { Container, Typography, Button, AppBar, Toolbar, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { revalidatePath } from 'next/cache';

const fetchUsers = async () => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api'

    // get the list of users
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const UsersPage = async () => {
  revalidatePath('/users')
  const users = await fetchUsers();
  console.log(users);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD App
          </Typography>
          <Button color="inherit" component={Link} href="/users/add">
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '20px' }}>
        User List
      </Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id} divider>
            <ListItemText primary={user.user} />
            <ListItemSecondaryAction>
              <Button size="small" component={Link} href={`/users/${user._id}`} variant="contained" color="primary">
                View Details
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UsersPage;
