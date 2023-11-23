export const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.length !== 0 ? (
        contacts.map(({ id, number, name }) => {
          return (
            <li key={id}>
              {name}:{number}
              <button onClick={() => deleteContact(id)} type="button">
                Delete
              </button>
            </li>
          );
        })
      ) : (
        <li> any contacts here</li>
      )}
    </ul>
  );
};
