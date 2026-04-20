import { useState } from 'react';
import Chat from './Chat.jsx';
import ContactList from './contactList.jsx';
import TaskApp from './TaskApp.jsx';
import ItinerarioApp from './ItinerarioApp.jsx';
import KiotoApp from './KiotoApp.jsx';

export default function App() {
  const [to, setTo] = useState(contacts[0]);

  return (
    <main>
      <section>
        <h2>Mensajeria</h2>
        <ContactList
          contacts={contacts}
          selectedContact={to}
          onSelect={contact => setTo(contact)}
        />
        <Chat key={to.email} contact={to} />
      </section>
      <hr />
      <TaskApp />
      <hr />
      <ItinerarioApp />
      <hr />
      <KiotoApp />
    </main>
  );
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
