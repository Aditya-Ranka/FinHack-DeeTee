import { Heart } from 'lucide-react';

export default function Dating() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-pink-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Perfect Match
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover meaningful connections in a safe and respectful environment.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example profiles - these would typically be fetched from your backend */}
          {[
            {
              name: 'Alex',
              age: 28,
              location: 'New York, NY',
              interests: ['Photography', 'Travel', 'Cooking'],
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
            },
            {
              name: 'Jordan',
              age: 25,
              location: 'Los Angeles, CA',
              interests: ['Music', 'Hiking', 'Art'],
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop',
            },
            {
              name: 'Sam',
              age: 30,
              location: 'Chicago, IL',
              interests: ['Reading', 'Yoga', 'Coffee'],
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop',
            },
          ].map((profile, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {profile.name}, {profile.age}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}