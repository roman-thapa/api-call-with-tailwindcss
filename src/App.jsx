import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data.results[0]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-xs ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
        {user && (
          <div className={`p-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            <img className="w-full h-auto mx-auto rounded-full" src={user.picture.large} alt="Profile" />
            <div className="text-center mt-4">
              <h1 className="text-xl font-semibold">{`${user.name.first} ${user.name.last}`}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4 p-4">
          <button
            className={`px-4 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-md`}
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
