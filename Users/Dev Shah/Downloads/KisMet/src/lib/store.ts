import { create } from 'zustand';
import { Profile } from './supabase';

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));

interface SwipeState {
  currentProfile: Profile | null;
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  removeProfile: () => void;
}

export const useSwipeStore = create<SwipeState>((set) => ({
  currentProfile: null,
  profiles: [],
  setProfiles: (profiles) => set({ profiles, currentProfile: profiles[0] || null }),
  removeProfile: () => set((state) => ({
    profiles: state.profiles.slice(1),
    currentProfile: state.profiles[1] || null,
  })),
}));