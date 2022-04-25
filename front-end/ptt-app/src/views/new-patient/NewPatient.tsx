import React, { useState } from "react";

import "./NewPatient.css";

const App: React.FunctionComponent = () => {
  const [term, setTerm] = useState("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something
    alert(term);
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div>
          <text> Hasta Adı</text>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Ad"
            className="input"
          />

          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Soyad"
            className="input"
          />

          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Yaş"
            className="input"
          />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Kilo"
            className="input"
          />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Boy"
            className="input"
          />
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
