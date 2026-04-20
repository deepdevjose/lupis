import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chatear con ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Enviar a {contact.email}</button>
    </section>
  );
}
