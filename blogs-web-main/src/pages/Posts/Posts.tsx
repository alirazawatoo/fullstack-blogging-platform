import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid } from '@mui/material';
import Cookies from 'js-cookie';
import { PostType } from 'types/post';

import { Header } from 'components/Header/Header';
import { Post } from 'components/Post/Post';
import { routes } from 'constants/routes';
import { getPosts } from 'services/postService';

export const Posts = (): JSX.Element => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await getPosts(Cookies.get('authtoken') as string);

        setPosts(response.data.payload);
      } catch (error) {
        throw new Error('Cannot get posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" onClick={() => navigate(routes.newPost)}>
            Create New Post
          </Button>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
