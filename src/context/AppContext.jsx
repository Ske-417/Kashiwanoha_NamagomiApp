import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "山田 太郎",
    address: "神山町 1-2-3",
    points: 1250,
    totalSavedKg: 15.4,
  });

  const [history, setHistory] = useState([
    { id: 1, date: "2024-01-20", type: "waste", amount: 1.2, points: 120 },
    { id: 2, date: "2024-01-22", type: "compost", amount: 0.5, points: 50 },
    { id: 3, date: "2024-01-25", type: "waste", amount: 2.0, points: 200 },
  ]);

  const [stats, setStats] = useState({
    regionalTotalKg: 12500,
    co2Reduced: 3200, // kg-CO2
    householdEquivalent: 450, // households
  });

  const addEntry = (type, amount) => {
    const pointsEarned = Math.floor(amount * 100); // Simple logic: 100 pts per kg
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type,
      amount: parseFloat(amount),
      points: pointsEarned,
    };

    setHistory([newEntry, ...history]);
    setUser(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalSavedKg: prev.totalSavedKg + parseFloat(amount),
    }));
    setStats(prev => ({
       ...prev,
       regionalTotalKg: prev.regionalTotalKg + parseFloat(amount),
       co2Reduced: prev.co2Reduced + (parseFloat(amount) * 2.5) // Mock CO2 calc
    }));
  };

  return (
    <AppContext.Provider value={{ user, setUser, history, stats, addEntry }}>
      {children}
    </AppContext.Provider>
  );
};
