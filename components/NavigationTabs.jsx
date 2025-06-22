export default function NavigationTabs({ activeTab }) {
  const tabs = [
    "Overview",
    "Onboard",
    "Milestones",
    "Deliverables",
    "Calendar",
    "Discussion",
  ];

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 rounded-md ${
              activeTab === tab
                ? "bg-[#C72C88] text-white font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-transparent border-[#C72C88] text-[#C72C88] border-2 font-medium rounded-lg hover:bg-[#C72C88] hover:text-white transition-colors">
          Add Card
        </button>
        <button className="px-4 py-2 bg-transparent border-[#10898F] text-[#10898F] border-2 font-medium rounded-lg hover:bg-[#10898F] hover:text-white transition-colors">
          Create Task
        </button>
      </div>
    </div>
  );
}
