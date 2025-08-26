import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const events = [
  { id: 1, title: "Tech Summit 2025", date: "2025-09-01", description: "Join industry leaders for talks on AI, cloud computing, and innovation.", image: "https://picsum.photos/id/1015/400/250" },
  { id: 2, title: "Music Festival", date: "2025-09-03", description: "Experience live performances and amazing food with friends and family.", image: "https://picsum.photos/id/1025/400/250" },
  { id: 3, title: "Startup Workshop", date: "2025-09-05", description: "Learn how to launch your startup from successful entrepreneurs.", image: "https://picsum.photos/id/1035/400/250" },
  { id: 4, title: "Art Exhibition", date: "2025-09-07", description: "Explore modern art and meet the artists behind the masterpieces.", image: "https://picsum.photos/id/1045/400/250" },
  { id: 5, title: "Food Carnival", date: "2025-09-09", description: "Taste delicacies from around the world in one place.", image: "https://picsum.photos/id/1055/400/250" },
  { id: 6, title: "Fitness Bootcamp", date: "2025-09-11", description: "Join experts for a day of workouts, wellness tips, and fun challenges.", image: "https://picsum.photos/id/1065/400/250" },
  { id: 7, title: "Gaming Convention", date: "2025-09-13", description: "Play, explore, and meet fellow gamers at the biggest gaming event.", image: "https://picsum.photos/id/1075/400/250" },
  { id: 8, title: "Photography Meetup", date: "2025-09-15", description: "Learn new photography skills and network with enthusiasts.", image: "https://picsum.photos/id/1085/400/250" },
  { id: 9, title: "Film Screening", date: "2025-09-17", description: "Watch exclusive indie films and meet the filmmakers.", image: "https://picsum.photos/id/1095/400/250" },
  { id: 10, title: "Coding Hackathon", date: "2025-09-19", description: "Compete in coding challenges and win exciting prizes.", image: "https://picsum.photos/id/1105/400/250" },
  { id: 11, title: "Yoga Retreat", date: "2025-09-21", description: "Relax, meditate, and recharge with expert instructors.", image: "https://picsum.photos/id/1115/400/250" },
  { id: 12, title: "Fashion Expo", date: "2025-09-23", description: "Discover new trends, designers, and amazing runway shows.", image: "https://picsum.photos/id/1125/400/250" },
  { id: 13, title: "Book Fair", date: "2025-09-25", description: "Meet authors, explore new releases, and enjoy literary events.", image: "https://picsum.photos/id/1135/400/250" },
  { id: 14, title: "Dance Workshop", date: "2025-09-27", description: "Learn different dance styles from professional choreographers.", image: "https://picsum.photos/id/1145/400/250" },
  { id: 15, title: "Science Expo", date: "2025-09-29", description: "Experience interactive science exhibits and educational activities.", image: "https://picsum.photos/id/1155/400/250" },
  { id: 16, title: "Charity Run", date: "2025-10-01", description: "Participate in a run to support local charities and communities.", image: "https://picsum.photos/id/1165/400/250" },
  { id: 17, title: "Wine Tasting", date: "2025-10-03", description: "Taste exquisite wines and learn from expert sommeliers.", image: "https://picsum.photos/id/1175/400/250" },
  { id: 18, title: "Comedy Night", date: "2025-10-05", description: "Laugh out loud with top comedians in a fun-filled evening.", image: "https://picsum.photos/id/1185/400/250" },
  { id: 19, title: "Cultural Festival", date: "2025-10-07", description: "Celebrate diverse cultures with performances, food, and workshops.", image: "https://picsum.photos/id/1195/400/250" },
  { id: 20, title: "Tech Meetup", date: "2025-10-09", description: "Network with tech enthusiasts and learn about the latest gadgets.", image: "https://picsum.photos/id/1205/400/250" },
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    // Load the selected event
    const foundEvent = events.find((e) => e.id === parseInt(id));
    setEvent(foundEvent);

    // Update login state if localStorage changes
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  if (!event) return <h2 className="not-found">Event not found</h2>;

  const handleAction = () => {
    if (isLoggedIn) {
      alert(`You have booked: ${event.title}`);
    } else {
      // Save the intended event page before redirecting to login
      localStorage.setItem("redirectAfterLogin", `/event/${event.id}`);
      navigate("/login");
    }
  };

  return (
    <div className="event-details">
      <img src={event.image} alt={event.title} className="event-banner" />
      <div className="event-info">
        <h1>{event.title}</h1>
        <p className="event-date">📅 {event.date}</p>
        <p className="event-description">{event.description}</p>
        <button className="action-btn" onClick={handleAction}>
          {isLoggedIn ? "Book Now" : "Sign in to Book"}
        </button>
      </div>
    </div>
  );
}