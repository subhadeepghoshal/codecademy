import { createContext, use, useState, type PropsWithChildren } from 'react';

type AuthValue = {
  session: string | null;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // Dummy auth: the session is just a marker kept in memory for now.
  const [session, setSession] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        session,
        signIn: () => setSession('dummy-session'),
        signOut: () => setSession(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
