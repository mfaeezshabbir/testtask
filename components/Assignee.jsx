import React from "react";

const Assignee = ({ teamMembers = [] }) => {
  // Show only 2 team members and display "+N" for additional members
  const visibleMembers = teamMembers.slice(0, 2);
  const remainingMembersCount = Math.max(0, teamMembers.length - 2);

  return (
    <div className="flex items-center">
      {visibleMembers.map((member, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full border-2 border-white overflow-hidden -ml-2 text-sm cursor-pointer ${
            index === 0 ? "ml-0" : ""
          } flex items-center justify-center`}
          style={{
            background: `linear-gradient(180deg, #4DB5E2 0%, #1E65B1 100%)`,
          }}
          title={member.name}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            member.name.charAt(0)
          )}
        </div>
      ))}
      {remainingMembersCount > 0 && (
        <div
          className="w-6 h-6 rounded-full text-white border-2 border-white -ml-2 flex items-center justify-center text-xs font-medium"
          style={{
            background: `linear-gradient(180deg, #4DB5E2 0%, #1E65B1 100%)`,
          }}
        >
          +{remainingMembersCount}
        </div>
      )}
    </div>
  );
};

export default Assignee;
