import React from 'react';

export function Button(props: React.ComponentProps<'button'>) {
  return <button type="button" {...props} />;
}

export function Input(props: React.ComponentProps<'input'>) {
  return <input {...props} />;
}

export function Textarea(props: React.ComponentProps<'textarea'>) {
  return <textarea {...props} />;
}
