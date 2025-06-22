import { UserRoundPlus } from "lucide-react";

export default function TeamMembers({ members }) {
  const maxVisibleMembers = 5;
  const visibleMembers = members.slice(0, maxVisibleMembers);
  const remainingMembersCount = Math.max(0, members.length - maxVisibleMembers);

  const handleAddMember = () => {
    // Logic to add a new member
    alert("Add new member functionality not implemented yet.");
  };

  return (
    <div className="flex items-center">
      {visibleMembers.map((member) => (
        <div
          key={member.id}
          className={`w-8 h-8 rounded-full bg-gray-200 border-2 border-transparent overflow-hidden -ml-3 text-sm cursor-pointer first:ml-0 flex items-center justify-center bg-blue-${
            ((parseInt(member.id.charCodeAt(0)) % 4) + 3) * 100
          }`}
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
        <div className="w-8 h-8 rounded-full bg-[#142c29] text-white border-2 border-white -ml-3 flex items-center justify-center text-xs font-medium">
          +{remainingMembersCount}
        </div>
      )}
      <button
        className="w-8 h-8 rounded-full bg-[#1AA796] border-2 border-white -ml-3 flex items-center justify-center cursor-pointer"
        onClick={handleAddMember}
      >
        <UserRoundPlus color="white" size={16} />
      </button>
    </div>
  );
}
