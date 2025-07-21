import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";
import "./FormContainer.css";

type FormProps = {
  onSubmitSuccess: () => void;
};

const FormContainer: React.FC<FormProps> = ({ onSubmitSuccess }) => {
  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/shorturl`, { fullUrl });
      setFullUrl("");
      onSubmitSuccess(); 
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="url" className="form-label">
          let's turn your novel-length URL into a haiku:
        </label>

        <div className="input-group">
          <span className="input-prefix">url-shortener/link/</span>
          <input
            type="text"
            id="url"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            placeholder="https://example.com"
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          shrinkURL
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
