import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { ContactsForm } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

const getInitValue = () => {
  const savedContacts = localStorage.getItem('saved-contacts');
  if (savedContacts !== null) {
  return  JSON.parse(savedContacts);
  }

  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitValue);
  const [filter, setFilter] = useState('');

  useEffect(() => {
   
  localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onChangeFilter = evt => {
    setFilter(evt.target.value);
  };
  const handleFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const handleSubmit = values => {
    const isHas = contacts.some(contact => contact.name === values.name);
    if (isHas) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    
    setContacts(prevState => [...prevState, newContact]);
  }
    return (
      <div>
        <ContactsForm submit={handleSubmit} />
        <Filter onChange={onChangeFilter} value={filter} />
        <Contacts contacts={handleFilter()} deleteContact={deleteContact} />
      </div>
    );
  };

