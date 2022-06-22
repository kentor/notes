import React, {useState} from 'react';
import {Button, Input} from 'App/components/Elements';
import {login} from 'App/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      const message = err && err.message;
      if (typeof message === 'string') {
        setError(message);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'min-content',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {error && <div style={{color: 'red'}}>{error}</div>}
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Username..."
        type="email"
        value={email}
      />
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password..."
        type="password"
        value={password}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

export default Login;
