// File: /client/src/pages/SignupForm.tsx

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import * as Auth from '../utils/auth';
import type { ChangeEvent, FormEvent } from 'react';
import type { User } from '../models/User';

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      Auth.login(data.addUser.token);
      handleModalClose();
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
        Something went wrong with your signup!
      </Alert>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username || ''}
          required
        />
      </Form.Group>
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
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type="submit"
        variant="success"
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
