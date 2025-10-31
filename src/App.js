// App.js
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, currentUserResponse] = await Promise.all([
          fetch("http://localhost:4000/users"),
          fetch("http://localhost:4000/current-user")
        ]);
        
        const usersData = await usersResponse.json();
        const currentUserData = await currentUserResponse.json();
        
        setUsers(usersData);
        setCurrentUser(currentUserData);
      } catch (error) {
        // Error handled silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const appContext = {
    users,
    currentUser,
    setCurrentUser,
    isLoading
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header>
        <NavBar currentUser={currentUser} />
      </header>
      <main>
        <Outlet context={appContext} />
      </main>
    </div>
  );
}

export default App;