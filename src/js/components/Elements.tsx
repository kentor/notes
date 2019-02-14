import React from 'react';

export function Button(props: React.ComponentProps<'button'>) {
  return (
    <>
      <button type="button" {...props} />
      <style jsx>
        {`
          button {
            background: #333;
            border-radius: 4px;
            border: none;
            color: #eee;
            cursor: pointer;
            padding: 10px 16px;
          }
        `}
      </style>
    </>
  );
}

export function Input(props: React.ComponentProps<'input'>) {
  return (
    <>
      <input {...props} />
      <style jsx>
        {`
          input {
            background: #333;
            border: none;
            border-radius: 4px;
            color: #eee;
            padding: 10px;
          }
        `}
      </style>
    </>
  );
}

export function Textarea(props: React.ComponentProps<'textarea'>) {
  return (
    <>
      <textarea {...props} />
      <style jsx>
        {`
          textarea {
            background: #333;
            border-radius: 4px;
            border: none;
            color: #eee;
            padding: 10px;
          }
        `}
      </style>
    </>
  );
}
