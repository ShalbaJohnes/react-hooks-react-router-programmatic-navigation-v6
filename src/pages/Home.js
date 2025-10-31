// Home.js
import { Outlet, useOutletContext } from "react-router-dom";
import UserCard from "../components/UserCard";

function Home() {
  const { users, currentUser } = useOutletContext();
  
  const userList = users.map(user => (
    <UserCard key={user.id} user={user} currentUser={currentUser} />
  ));

  return (
    <div className="home-layout">
      <section className="user-list">
        <h2>All Users</h2>
        {userList}
      </section>
      
      <section className="user-detail">
        <Outlet context={{ users, currentUser }} />
      </section>
    </div>
  );
}

export default Home;