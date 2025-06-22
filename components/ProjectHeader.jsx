import { Share2 } from "lucide-react";
import TeamMembers from "./TeamMembers";
import ProgressBar from "./ProgressBar";

export default function ProjectHeader({ title, budget, teamMembers }) {
  const items = [
    { label: "Name:", value: title },
    { label: "Budget:", value: `$${budget.toLocaleString()}` },
    { label: "Status:", value: "In Progress" },
    { label: "Team on Project:", value: <TeamMembers members={teamMembers} /> },
    { label: "Completion Rate:", value: <ProgressBar percentage={75} /> },
  ];

  return (
    <div className="h-27 p-4 m-4 rounded-xl bg-gray-100 flex items-center justify-between border border-transparent">
      <div className="flex items-center gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-sm bg-gray-100 px-3 py-1 rounded-full flex flex-col"
          >
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-xl mt-2">{item.value}</span>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-1 px-3 py-1.5 bg-[#10898F] rounded-lg text-white transition-colors">
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    </div>
  );
}
