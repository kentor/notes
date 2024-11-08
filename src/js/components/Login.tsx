import React, { useState } from 'react';
import { Button, Input } from 'App/components/Elements.tsx';
import { db } from 'App/db.ts';

const style = {
  display: 'grid',
  gap: 16,
  gridTemplateColumns: 'min-content',
  justifyContent: 'center',
  padding: 16,
};

function Login() {
  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSentEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      setError(`Error: ${err.body?.message}`);
      setSentEmail('');
    });
  }

  function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code) return;
    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      setError(`Error: ${err.body?.message}`);
      setCode('');
    });
  }

  const loginWithGoogle = (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
      }}
    >
      <a
        href={db.auth.createAuthorizationURL({
          clientName: 'n.kentor.dev',
          redirectURL: window.location.href,
        })}
        style={{ color: '#eee', textDecoration: 'none' }}
      >
        Login with google
      </a>
    </div>
  );

  return sentEmail
    ? (
      <form onSubmit={handleCodeSubmit} style={style}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Input disabled type='email' value={sentEmail} />
        <Input
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder='Code'
          type='text'
          value={code}
        />
        <Button type='submit'>Login</Button>
        {loginWithGoogle}
      </form>
    )
    : (
      <form onSubmit={handleEmailSubmit} style={style}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Email'
          type='email'
          value={email}
        />
        <Button type='submit'>Send Code</Button>
        {loginWithGoogle}
      </form>
    );
}

export default Login;
