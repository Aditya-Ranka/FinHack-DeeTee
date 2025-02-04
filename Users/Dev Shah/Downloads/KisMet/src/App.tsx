import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useProfileStore } from './lib/store';

// Pages
import SwipePage from './pages/swipe';
import ProfilePage from './pages/profile';
import MatchesPage from './pages/matches';
import ChatPage from './pages/chat';

function App() {
  const { profile, setProfile } = useProfileStore();
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [setProfile]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .limit(1)
      .maybesingle();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              profile ? (
                <SwipePage />
              ) : (
                <ProfilePage />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/profile"
          element={session ? <ProfilePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/matches"
          element={session ? <MatchesPage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/chat/:matchId"
          element={session ? <ChatPage /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;