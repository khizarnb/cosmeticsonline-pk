import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (fullName: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'cosmetics_online_user_v1';

const DEMO_USER: User = {
  id: 'usr-demo-1',
  fullName: 'Fatima Tariq',
  email: 'fatima.tariq@gmail.com',
  phone: '+92 321 8456789',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Fatima Tariq',
      phone: '+92 321 8456789',
      addressLine: 'House 42-B, Street 7, Phase 5, DHA',
      apartment: 'Villa 4',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: 'Fatima Tariq (Office)',
      phone: '+92 321 8456789',
      addressLine: 'Floor 3, Gulberg Heights, Main Boulevard Gulberg',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54660',
      isDefault: false,
    }
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  }, [user]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    // Admin demo quick login
    if (email.toLowerCase().includes('admin')) {
      const adminUser: User = {
        id: 'usr-admin',
        fullName: 'Store Administrator',
        email: 'admin@cosmeticsonline.pk',
        phone: '+92 300 0000000',
        role: 'admin',
        addresses: [],
      };
      setUser(adminUser);
      return true;
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      fullName: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email: email,
      phone: '+92 300 1234567',
      role: 'customer',
      addresses: DEMO_USER.addresses,
    };
    setUser(newUser);
    return true;
  };

  const register = async (fullName: string, email: string, phone: string): Promise<boolean> => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      fullName,
      email,
      phone,
      role: 'customer',
      addresses: [],
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    if (!user) return;
    const addr: Address = {
      ...newAddr,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0 ? true : !!newAddr.isDefault,
    };
    let updatedAddresses = [...user.addresses];
    if (addr.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(addr);
    setUser({ ...user, addresses: updatedAddresses });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setUser({ ...user, addresses: updated });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setUser({ ...user, addresses: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
