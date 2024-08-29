import React, {useState} from 'react';
import {Button, Input} from 'App/components/Elements';
import {db} from 'App/db';

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
    db.auth.sendMagicCode({email}).catch((err) => {
      setError(`Error: ${err.body?.message}`);
      setSentEmail('');
    });
  }

  function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code) return;
    db.auth.signInWithMagicCode({email: sentEmail, code}).catch((err) => {
      setError(`Error: ${err.body?.message}`);
      setCode('');
    });
  }

  return sentEmail ? (
    <form onSubmit={handleCodeSubmit} style={style}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <Input type="email" value={sentEmail} disabled />
      <Input
        onChange={(e) => {
          setCode(e.target.value);
        }}
        placeholder="Code"
        type="text"
        value={code}
      />
      <Button type="submit">Login</Button>
    </form>
  ) : (
    <form onSubmit={handleEmailSubmit} style={style}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
        type="email"
        value={email}
      />
      <Button type="submit">Send Code</Button>
    </form>
  );
}

export default Login;
