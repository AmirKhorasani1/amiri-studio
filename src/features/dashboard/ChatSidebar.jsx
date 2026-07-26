import React, { useState } from "react";
import { HiBars3, HiMagnifyingGlass } from "react-icons/hi2";
import ChatListItem from "./ChatListItem";
import { toSidebarChat } from "./utils/formatConversation";

const TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "opened", label: "Opened" },
  { key: "closed", label: "Closed" },
];

const ChatSidebar = ({ conversations, loading, activeId, onSelectChat, className = "" }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = conversations
    .filter((c) => (activeTab === "all" ? true : c.status === activeTab))
    .filter((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`relative flex h-full w-full flex-col bg-neutral-950 lg:w-[360px] lg:border-r lg:border-neutral-800 ${className}`}>
      <div className="flex items-center gap-3 px-4 pb-3 pt-4">
        <button
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
        >
          <HiBars3 size={20} />
        </button>

        <div className="relative flex-1">
          <HiMagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full bg-neutral-900 py-2 pl-9 pr-3 text-sm text-white placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <p className="mt-10 text-center text-sm text-neutral-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-500">No conversations found</p>
        ) : (
          filtered.map((conv) => (
            <ChatListItem
              key={conv._id}
              chat={toSidebarChat(conv)}
              isActive={conv._id === activeId}
              onSelect={onSelectChat}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;