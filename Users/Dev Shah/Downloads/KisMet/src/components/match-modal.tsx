import { motion } from 'framer-motion';
import { Profile } from '../lib/supabase';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';

interface MatchModalProps {
  matchedProfile: Profile;
  onClose: () => void;
  onStartChat: () => void;
}

export function MatchModal({ matchedProfile, onClose, onStartChat }: MatchModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 animate-ping bg-pink-500 rounded-full opacity-25" />
            <img
              src={matchedProfile.photos[0]}
              alt={matchedProfile.name}
              className="relative w-full h-full object-cover rounded-full"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            It's a Match!
          </h2>
          <p className="text-gray-600 mb-6">
            You and {matchedProfile.name} have liked each other
          </p>

          <div className="space-y-3">
            <Button
              onClick={onStartChat}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Send a Message
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Keep Swiping
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}