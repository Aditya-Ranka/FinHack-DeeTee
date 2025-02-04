import React, { JSXElementConstructor, Key, ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Match, type Profile } from '../lib/supabase';
import { useProfileStore } from '../lib/store';
import { Card, CardContent } from '../components/ui/card';

export default function MatchesPage() {
  const navigate = useNavigate();
  const { profile } = useProfileStore();
  const [matches, setMatches] = React.useState<(Match & { profile: Profile })[]>([]);

  React.useEffect(() => {
    if (!profile) return;

    const fetchMatches = async () => {
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select(`
          *,
          profiles!matches_user2_id_ <boltAction type="file" filePath="src/pages/matches.tsx">fkey(profiles.id):profile(*)
        `)
        .or(`user1_id.eq.${profile.id},user2_id.eq.${profile.id}`);

      if (matchesError) {
        console.error('Error fetching matches:', matchesError);
        return;
      }

      const processedMatches = matchesData.map((match: { user1_id: string; profiles: any; }) => ({
        ...match,
        profile: match.user1_id === profile.id
          ? match.profiles
          : match.profiles
      }));

      setMatches(processedMatches);
    };

    fetchMatches();
  }, [profile]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match: { id: Key | null | undefined; profile: { photos: (string | undefined)[]; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; }; created_at: string | number | Date; }) => (
          <Card
            key={match.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/chat/${match.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={match.profile.photos[0]}
                  alt={match.profile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{match.profile.name}</h3>
                  <p className="text-sm text-gray-500">
                    Matched {new Date(match.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {matches.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No matches yet. Keep swiping!</p>
          </div>
        )}
      </div>
    </div>
  );
}