import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  Square3Stack3DIcon, 
  BookOpenIcon 
} from '@heroicons/react/24/outline';
import { getUserFromToken } from '../../utils/auth';

const BottomNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 z-40 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <NavLink 
          to="/user" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-600 scale-110' : 'text-gray-400'}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">Home</span>
        </NavLink>

        <NavLink 
          to="/inventory" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-600 scale-110' : 'text-gray-400'}`}
        >
          <ShoppingBagIcon className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">Stock</span>
        </NavLink>

        <NavLink 
          to="/items" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-600 scale-110' : 'text-gray-400'}`}
        >
          <Square3Stack3DIcon className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">Items</span>
        </NavLink>

        <NavLink 
          to="/recipes" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-600 scale-110' : 'text-gray-400'}`}
        >
          <BookOpenIcon className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">Recipe</span>
        </NavLink>

        {getUserFromToken()?.is_admin && (
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-red-500 scale-110' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center text-xl">🛠</div>
            <span className="text-[10px] font-black uppercase">Admin</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
