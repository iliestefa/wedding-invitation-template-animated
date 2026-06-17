import { createContext, useContext } from 'react';

const AnimatedContext = createContext(null);

export function AnimatedTemplateProvider({ data, children }) {
  const groomName = data.groomName || 'Alejandro';
  const brideName = data.brideName || 'María';
  const groomInitial = groomName[0].toUpperCase();
  const brideInitial = brideName[0].toUpperCase();

  const value = {
    ...data,
    groomName,
    brideName,
    couple: `${groomName} & ${brideName}`,
    coupleES: `${groomName} y ${brideName}`,
    initials: `${groomInitial}&${brideInitial}`,
  };

  return (
    <AnimatedContext.Provider value={value}>
      {children}
    </AnimatedContext.Provider>
  );
}

export function useAnimated() {
  const ctx = useContext(AnimatedContext);
  if (!ctx) throw new Error('useAnimated must be inside AnimatedTemplateProvider');
  return ctx;
}
