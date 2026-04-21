import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "../components/auth/ui/button";
import { Badge } from "../components/auth/ui/badge";
import { mockEvents } from "../data/mockData";

export function Events() {
  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-1">Join book meetups and readings</p>
        </div>
      </header>

      <div className="p-6 space-y-4">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#667eea] to-[#764ba2] flex flex-col items-center justify-center text-white flex-shrink-0">
                <span className="text-xs">{new Date(event.date).toLocaleDateString("en", { month: "short" })}</span>
                <span className="text-2xl font-semibold">{new Date(event.date).getDate()}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <Badge
                      variant="secondary"
                      className="bg-[#667eea]/10 text-[#667eea] hover:bg-[#667eea]/20"
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button className="flex-1 md:flex-none h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 rounded-[12px]">
                    Attend Event
                  </Button>
                  <Button variant="outline" className="h-10 rounded-[12px]">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
