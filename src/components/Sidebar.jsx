import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar({ setFilter }) {
  const { logout } = useContext(AuthContext);

  const menuItems = ["All", "Applied", "Interview", "Offer", "Rejected"];

  return (
    <div className="sidebar-nav" style={{
      width: "240px", height: "100vh", background: "black",
      color: "#fff", padding: "30px 20px", position: "fixed", 
    }}>
      <h2 style={{ color: "#818cf8", marginBottom: "40px" }}>SmartHire</h2>
      
      {menuItems.map(item => (
        <p key={item} onClick={() => setFilter(item)} className="nav-link">
          {item} Jobs
        </p>
      ))}

      <button onClick={logout} className="logout-btn">Logout</button>
      
      <style>{`
        .nav-link { 
          cursor: pointer; padding: 12px; border-radius: 8px; 
          color: #94a3b8; transition: 0.3s;  
        }
        .nav-link:hover { background: #1e293b; color: #fff; }
        .logout-btn {
          position: absolute; bottom: 30px; width: 200px;
          background: #334155; color: white; padding: 10px;
        }
        .logout-btn:hover { background: var(--danger); }
      `}</style>
    </div>
  );
}


export default Sidebar;