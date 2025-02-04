import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useProfileStore, useSwipeStore } from '../lib/store';
import { ProfileCard } from '../components/profile-card';
import { MatchModal } from '../components/match-modal';
import { useNavigate } from 'react-router-dom';

export default function SwipePage() {
  const navigate = useNavigate();
  const { profile } = useProfileStore();
  const { profiles, currentProfile, setProfiles, removeProfile } = useSwipeStore();
  const [matchedProfile, setMatchedProfile] = React.useState(null);

  React.useEffect(() => {
    if (!profile) return;

    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', profile.id)
        .not('id', 'in', (
          supabase
            .from('swipes')
            .select('swiped_id')
            .eq('swiper_id', profile.id)
        ));

      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }

      setProfiles(data);
    };

    fetchProfiles();
  }, [profile, setProfiles]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!profile || !currentProfile) return;

    const liked = direction === 'right';

    // Record the swipe
    const { error: swipeError } = await supabase
      .from('swipes')
      .insert({
        swiper_id: profile.id,
        swiped_id: currentProfile.id,
        liked,
      });

    if (swipeError) {
      console.error('Error recording swipe:', swipeError);
      return;
    }

    if (liked) {
      // Check if it's a match
      const { data: matchData, error: matchError } = await supabase
        .from('swipes')
        .select('*')
        .eq('swiper_id', currentProfile.id)
        .eq('swiped_id', profile.id)
        .eq('liked', true)
        .limit(1)
        .maybeSingle();

      if (matchError && matchError.code !== 'PGRST116') {
        console.error('Error checking for match:', matchError);
      }

      if (matchData) {
        // It's a match! Create a match record
        const { error: createMatchError } = await supabase
          .from('matches')
          .insert({
            user1_id: profile.id,
            user2_id: currentProfile.id,
          });

        if (createMatchError) {
          console.error('Error creating match:', createMatchError);
        } else {
          setMatchedProfile(currentProfile);
        }
      }
    }

    removeProfile();
  };

  if (!currentProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No more profiles to show
          </h2>
          <p className="text-gray-500">
            Check back later for more potential matches!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen p-4 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-lg aspect-[3/4]">
          <AnimatePresence>
            <ProfileCard
              key={currentProfile.id}
              profile={currentProfile}
              onSwipe={handleSwipe}
            />
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {matchedProfile && (
          <MatchModal
            matchedProfile={matchedProfile}
            onClose={() => setMatchedProfile(null)}
            onStartChat={() => {
              setMatchedProfile(null);
              navigate('/matches');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}