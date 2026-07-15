import "./ContactList.css";

function ContactList(props) {
  return (
    <div className="contact-list">
      {props.users.map((user) => (
        <div key={user.id} className="contact-card">
          <p
            className="contact-name"
            onDoubleClick={() => props.editUser(user)}
          >
            {user.firstName} {user.lastName}
          </p>
          <span
            className="contact-delete"
            onClick={() => props.deleteUser(user.id)}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
