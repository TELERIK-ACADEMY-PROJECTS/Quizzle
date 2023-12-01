import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { groupsRef } from "../../../services/educatorGroups.services";
import { onValue } from "firebase/database";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    onValue(groupsRef, (snapshot) => {
      if (snapshot.exists()) {
        const groupsArray = Object.entries(snapshot.val()).map(
          ([id, group]) => ({
            id,
            ...group,
          })
        );
        setGroups(groupsArray);
      } else {
        setGroups([]);
      }
    });
  }, []);

  return (
    <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center p-6 mt-16 ">
      <h1 className="mb-4 text-3xl text-center font-bold text-black">Groups List</h1>
      <div className="flex flex-col text-center space-y-7 w-full md:w-1/4 opacity-95 ">
        {groups.map((group, index) => (
          <div style={{ animation: `slideInFromRight 0.5s ${index * 0.1}s both` }} key={group.id} className="p-4 border-2 hover:border-fuchsia-400 rounded-md w-full text-white hover:shadow-2xl bg-gradient-to-l from-indigo-400 to-cyan-400 transition-all duration-500 ease-in-out transform hover:scale-105">
            <Link to={`/group/${group.id}`} className="no-underline text-white">
              Name
              <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
              Organization
              {group.organization && <p className="text-white text-xl  font-bold">{group.organization}</p>}
            </Link>
          </div>
        ))}
        {groups.length === 0 && <p className="text-red-500 font-bold">No groups available</p>}
      </div>
    </div>
  );
};

export default GroupsList;