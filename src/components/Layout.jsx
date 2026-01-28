import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, ScanLine, History, User, Gift } from 'lucide-react';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </main>
      
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%', // Centering for desktop view if max-width is constrained
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px', // Match #root max-width
        backgroundColor: 'hsl(var(--color-surface))',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0.75rem 0.5rem',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.05)',
        zIndex: 50
      }}>
        <NavItem to="/" icon={<Home size={24} />} label="ホーム" />
        <NavItem to="/history" icon={<History size={24} />} label="履歴" />
        <NavItem to="/scan" icon={<ScanLine size={24} />} label="回収" isPrimary />
        <NavItem to="/rewards" icon={<Gift size={24} />} label="交換" />
        <NavItem to="/profile" icon={<User size={24} />} label="マイページ" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, isPrimary }) => {
  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: isActive ? 'hsl(var(--color-primary))' : 'hsl(var(--color-text-muted))',
        fontWeight: isActive ? 600 : 400,
        fontSize: '0.7rem',
        gap: '0.25rem',
        ...(isPrimary && {
          color: 'hsl(var(--color-primary))', // Always primary color
          backgroundColor: 'hsl(var(--color-bg))',
          borderRadius: '50%',
          padding: '0.75rem',
          marginTop: '-1.5rem', // Floating effect
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          border: '4px solid #f0f2f0' // Match body bg to create cut-out look
        })
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default Layout;
