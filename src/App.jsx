import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";
//const dbURL = "http://localhost:5000/users";

function App() {
  return (
    <div className="App">
      <h1>Contact List</h1>

      <div className="form-container">
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
