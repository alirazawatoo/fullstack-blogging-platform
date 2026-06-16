import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { postSchema } from 'schemas/postSchema';
import { NewPostPayload } from 'types/newPostPayload';

import { TextInput } from 'components/TextInput/TextInput';
import { routes } from 'constants/routes';
import { createPost } from 'services/postService';

export const PostForm = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: NewPostPayload, { setFieldError }: FormikHelpers<NewPostPayload>) => {
      createPost(values)
        .then(() => {
          navigate(routes.posts);
        })
        .catch((error) => {
          setFieldError('content', error.response.data.message);
        });
    },
    [navigate]
  );

  return (
    <Formik initialValues={{ title: '', content: '' }} onSubmit={handleSubmit} validationSchema={postSchema}>
      {() => (
        <Form>
          <TextInput fullWidth name="title" label="Title" type="title" autoComplete="title" />
          <TextInput name="content" label="Content" autoComplete="content" multiline fullWidth minRows={4} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};
