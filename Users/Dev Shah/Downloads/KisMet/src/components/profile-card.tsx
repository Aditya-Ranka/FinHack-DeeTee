import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Profile } from '../lib/supabase';
import { calculateAge } from '../lib/utils';
import { Heart, X } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
}

export function ProfileCard({ profile, onSwipe }: ProfileCardProps) {
  const [currentPhoto, setCurrentPhoto] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
    setDragging(false);
  };

  const nextPhoto = () => {
    if (!dragging && currentPhoto < profile.photos.length - 1) {
      setCurrentPhoto((prev: number) => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (!dragging && currentPhoto > 0) {
      setCurrentPhoto((prev: number) => prev - 1);
    }
  };

  return (
    <motion.div
      className="absolute w-full h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-full">
        <img
          src={profile.photos[currentPhoto]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {/* Photo navigation */}
        <div className="absolute top-0 w-full h-full flex">
          <div
            className="w-1/2 h-full cursor-pointer"
            onClick={prevPhoto}
          />
          <div
            className="w-1/2 h-full cursor-pointer"
            onClick={nextPhoto}
          />
        </div>

        {/* Photo indicators */}
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
          {profile.photos.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentPhoto
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h2 className="text-2xl font-bold">
            {profile.name}, {calculateAge(profile.birth_date)}
          </h2>
          <p className="mt-2 line-clamp-2">{profile.bio}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-sm bg-white/20"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Like/Dislike indicators */}
        <motion.div
          className="absolute top-8 right-8 rounded-full bg-green-500 p-2"
          style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
        >
          <Heart className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          className="absolute top-8 left-8 rounded-full bg-red-500 p-2"
          style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
        >
          <X className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}