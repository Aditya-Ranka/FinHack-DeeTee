import { Users } from 'lucide-react';


export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Users className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to Our Community
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect with like-minded individuals and join various interest groups.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example community groups - these would typically be fetched from your backend */}
          {[
            {
              title: 'Tech Enthusiasts',
              members: 1234,
              description: 'Discuss the latest in technology and innovation',
            },
            {
              title: 'Book Club',
              members: 567,
              description: 'Share your love for reading and discover new books',
            },
            {
              title: 'Fitness & Wellness',
              members: 890,
              description: 'Tips and support for a healthy lifestyle',
            },
          ].map((group, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{group.title}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{group.description}</p>
                </div>
                <div className="mt-3 text-sm">
                  <span className="text-indigo-600">{group.members.toLocaleString()} members</span>
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                    Join Group
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