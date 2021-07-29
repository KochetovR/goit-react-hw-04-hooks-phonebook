import { useState, useEffect } from 'react';
import ContactFrom from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Modal from '../Modal/Modal';

import { v4 as uuidv4 } from 'uuid';
import styles from './Phonebook.module.css';

export default function Phonebook() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const contact = {
      name: data.name,
      number: data.number,
      id: uuidv4(),
    };
    setContacts(contacts => [contact, ...contacts]);
  };

  const contactsFilterHandler = element => {
    setFilter(element.currentTarget.value);
  };

  const onDeleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contacts =>
    contacts.name.toLowerCase().includes(normalizeFilter),
  );

  return (
    <div className={styles.box}>
      <h1>Phonebook</h1>

      <button
        className={styles.modal__button__open}
        type="button"
        onClick={toggleModal}
      >
        Добавить контакт
      </button>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactFrom onSubmit={formSubmitHandler} onClose={toggleModal} />
        </Modal>
      )}

      <h2>Contacts</h2>
      <Filter value={filter} onChange={contactsFilterHandler} />
      <ContactList contacts={filterContacts} onClick={onDeleteContact} />
    </div>
  );
}
