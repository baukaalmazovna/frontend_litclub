import { Link, useParams } from "react-router";
import { ArrowLeft, Users, Calendar, MessageCircle, UserPlus } from "lucide-react";
import { mockClubs, mockEvents } from "../data/mockData";

export function ReadingClub() {
  const { id } = useParams();
  const club = mockClubs.find((c) => c.id === id) || mockClubs[0];
  const clubEvents = mockEvents.filter((e) => e.type === "meetup");

  const discussionMessages = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      message: "What did everyone think about chapter 5? The plot twist was incredible!",
      time: "2 hours ago",
      replies: 3,
    },
    {
      id: "2",
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      message: "Has anyone finished the book yet? I'm about halfway through.",
      time: "5 hours ago",
      replies: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">

      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center gap-4">
          <Link to="/app">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Reading Club</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-32 md:h-40 relative">
            <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <h2 className="text-2xl font-semibold text-white mb-1">{club.name}</h2>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Users className="w-4 h-4" />
                <span>{club.members} members</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-4">{club.description}</p>
            <div className="flex gap-3">
              {/* Join button */}
              <button className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity">
                <UserPlus className="w-4 h-4" />
                Join Club
              </button>
              {/* Message button */}
              <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Currently Reading</h3>
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=200&q=80"
              alt="Current book"
              className="w-20 h-28 rounded-lg object-cover shadow-md"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{club.currentBook}</h4>
              <p className="text-sm text-gray-600 mb-3">by Matt Haig</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Next meeting: {club.nextMeeting}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Members</h3>
            <button className="text-sm text-blue-500 hover:text-purple-600 font-medium">
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {/* Avatar circle */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                    alt={`Member ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-700 text-center">Member {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion</h3>

          <div className="space-y-4">
            {discussionMessages.map((msg) => (
              <div key={msg.id} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex gap-3">
                  {/* User avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img src={msg.user.avatar} alt={msg.user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{msg.user.name}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{msg.message}</p>
                    <button className="text-xs text-blue-500 hover:text-purple-600 font-medium">
                      {msg.replies} replies
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-200 my-4" />

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>

          <div className="space-y-3">
            {clubEvents.map((event) => (
              <Link
                key={event.id}
                to="/app/events"
                className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs">
                    {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                  </span>
                  <span className="text-xl font-semibold">
                    {new Date(event.date).getDate()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-500 mb-1">{event.time} • {event.location}</p>
                  <p className="text-xs text-gray-500">{event.attendees}/{event.maxAttendees} attending</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}