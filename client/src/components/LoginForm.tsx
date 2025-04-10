// File: /client/src/pages/LoginForm.tsx

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import * as Auth from '../utils/auth';
import type { ChangeEvent, FormEvent } from 'react';
import type { User } from '../models/User';

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      Auth.login(data.login.token);
      handleModalClose(); // Optional: Close modal on success
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedBooks: [],
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Invalid login credentials!
      </Alert>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email || ''}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password || ''}
          required
        />
      </Form.Group>
      <Button
        disabled={!(userFormData.email && userFormData.password)}
        type="submit"
        variant="success"
      >
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
