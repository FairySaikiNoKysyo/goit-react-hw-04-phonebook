import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import { ContactsForm } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

componentDidUpdate(prevState){
  if(prevState.contacts !== this.state.contacts){
    localStorage.setItem('saved-contacts',JSON.stringify(this.state.contacts))
  }
}
componentDidMount(){
  const savedContacts = localStorage.getItem('saved-contacts');
  if(savedContacts !== null){
    this.setState({
contacts: JSON.parse(savedContacts)
    })
  } 
}




  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  onChangeFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleSubmit = values => {
    const isHas = this.state.contacts.some(
      contact => contact.name === values.name
    );
    if (isHas) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
console.log(newContact)
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  render() {
    const filteredContacts = this.handleFilter();
    // const contacts = this.state.contacts;
    const onChange = this.onChangeFilter;
    const filter = this.state.filter;
    return (
      <div>
        <ContactsForm submit={this.handleSubmit} />
        <Filter onChange={onChange} value={filter} />
        <Contacts
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
