import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}


export default AdminLayout;
