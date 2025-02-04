import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { useProfileStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Camera, Loader2, Plus, Trash2 } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
  birth_date: z.string(),
  gender: z.string(),
  interests: z.array(z.string()),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { profile, setProfile } = useProfileStore();
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || undefined,
  });

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          photos: [...(profile.photos || []), publicUrl],
        })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      setProfile({
        ...profile,
        photos: [...(profile.photos || []), publicUrl],
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoDelete = async (index: number) => {
    if (!profile) return;

    const newPhotos = [...profile.photos];
    newPhotos.splice(index, 1);

    const { error } = await supabase
      .from('profiles')
      .update({ photos: newPhotos })
      .eq('id', profile.id);

    if (error) {
      console.error('Error deleting photo:', error);
      return;
    }

    setProfile({
      ...profile,
      photos: newPhotos,
    });
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!profile) return;

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', profile.id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    setProfile({
      ...profile,
      ...data,
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Photos</h2>
        <div className="grid grid-cols-3 gap-4">
          {profile.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handlePhotoDelete(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {profile.photos.length < 6 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Camera className="w-6 h-6 mr-2" />
                  <Plus className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input {...register('name')} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <Textarea {...register('bio')} />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <Input type="date" {...register('birth_date')} />
          {errors.birth_date && (
            <p className="mt-1 text-sm text-red-600">{errors.birth_date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register('gender')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </div>
  );
}