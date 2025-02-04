import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase, type Message, type Match, type Profile } from '../lib/supabase';
import { useProfileStore } from '../lib/store';
import { ChatWindow } from '../components/chat-window';


export default function ChatPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const { profile } = useProfileStore();
  const [match, setMatch] = React.useState<Match & { profile: Profile }>();
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    if (!profile || !matchId) return;

    const fetchMatch = async () => {
      const { data: matchData, error: matchError } = await supabase
        .from('matches')
        .select(`
          *,
          profiles!matches_user2_id_fkey(*)
        `)
        .eq('id', matchId)
        .limit(1)
        .maybeSingle();

      if (matchError) {
        console.error('Error fetching match:', matchError);
        return;
      }

      setMatch({
        ...matchData,
        profile: matchData.user1_id === profile.id
          ? matchData.profiles
          : matchData.profiles
      });
    };

    const fetchMessages = async () => {
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        return;
      }

      setMessages(messagesData);
    };

    fetchMatch();
    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`match:${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`,
        },
        (payload: { new: { id: string; match_id: string; sender_id: string; content: string; created_at: string; }; }) => {
          setMessages((current: any) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [profile, matchId]);

  const handleSendMessage = async (content: string) => {
    if (!profile || !match) return;

    const { error } = await supabase.from('messages').insert({
      match_id: match.id,
      sender_id: profile.id,
      content,
    });

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <ChatWindow
        messages={messages}
        match={match}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}