// UserProfile.js
import { useParams, useOutletContext, NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  const params = useParams();
  const { users, currentUser } = useOutletContext();
  
  const user = users.find(user => user.id === parseInt(params.id));

  if (!user) {
    return <div>User not found</div>;
  }

  const isOwnProfile = currentUser && currentUser.id === user.id;

  return (
    <aside className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt={`${user.name}'s avatar`} />
        <h1>{user.name}</h1>
        {isOwnProfile && <span className="badge">You</span>}
      </div>
      
      <nav className="profile-nav">
        <NavLink 
          to="posts" 
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Posts
        </NavLink>
        <NavLink 
          to="friends"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Friends
        </NavLink>
      </nav>
      
      <Outlet context={{ user, currentUser, users }} />
    </aside>
  );
}

export default UserProfile;