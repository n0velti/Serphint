// stores/authStore.ts
import { create } from 'zustand';
import { getCurrentUser, signOut, signIn, fetchUserAttributes} from 'aws-amplify/auth';

type AuthState = {
  user: any | null;
  setUser: (user: any | null) => void;
  fetchUser: () => Promise<void>;
  signInUser: (email: string, password: string) => Promise<{ isSignedIn: boolean; nextStep?: any }>;
  signOut: () => Promise<void>;
};


export const useAuthProvider = create<AuthState>((set) => ({
    user: null,
  
    setUser: (user) => set({ user }),
  
    fetchUser: async () => {
      try {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        set({ user: {currentUser, userAttributes} });
      } catch {
        set({ user: null });
      }
    },
  
    signInUser: async (email, password) => {
      const result = await signIn({ username: email, password });
  
      if (result.isSignedIn) {
        const currentUser = await getCurrentUser();
        set({ user: currentUser });
      }
  
      return result; // ✅ this fixes your TS error
    },
  
    signOut: async () => {
      await signOut();
      set({ user: null });
    },
  }));