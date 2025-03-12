import React, { useState, useEffect } from 'react';
import './Profiles.css';

const Profiles = ({ setShowQuiz }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('https://character-profile-app-backend.vercel.app/get-profiles');
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  return (
    <div className="profiles-container">
      <h3>Saved Profiles</h3>

      <table className="profiles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Hobbies</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length === 0 ? (
            <tr>
              <td colSpan="4">No profiles found.</td>
            </tr>
          ) : (
            profiles.map((profile, index) => (
              <tr key={index}>
                <td>{profile.name}</td>
                <td>{profile.age}</td>
                <td>{profile.hobby}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        className="take-quiz-button"
        onClick={() => window.location.reload()}
      >
        Take Quiz Again
      </button>
    </div>
  );
};

export default Profiles;