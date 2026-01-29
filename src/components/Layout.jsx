import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, ScanLine, History, User, Gift } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-shell">
      <div className="app-surface">
        <main className="app-main">
          <Outlet />
        </main>

        <nav className="app-nav">
          <NavItem to="/" icon={<Home size={22} />} label="ホーム" />
          <NavItem to="/history" icon={<History size={22} />} label="履歴" />
          <NavItem to="/scan" icon={<ScanLine size={22} />} label="回収" isPrimary />
          <NavItem to="/rewards" icon={<Gift size={22} />} label="交換" />
          <NavItem to="/profile" icon={<User size={22} />} label="マイページ" />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isPrimary }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (
        `nav-item${isActive ? ' is-active' : ''}${isPrimary ? ' nav-item--primary' : ''}`
      )}
    >
      {icon}
      <span className="nav-item__label">{label}</span>
    </NavLink>
  );
};

export default Layout;
