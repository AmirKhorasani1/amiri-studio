import React from "react";

const features = [
  "User Authentication",
  "Real-time Chat",
  "Order Management",
  "Admin Dashboard",
];

const techStack = ["React", "Node.js", "MongoDB", "Tailwind CSS"];

const VercelCommentCard = () => {
  return (
    <div className="mt-10 w-full">
        <div className="grid grid-cols-2 gap-10 w-full">
          {/* Features column */}
          <div>
            <h3 className="text-sm font-medium text-neutral-400">
              Features
            </h3>
            <div className="mt-3 flex flex-col gap-2.5">
              {features.map((item) => (
                <div key={item} className="text-sm text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack column */}
          <div>
            <h3 className="text-sm font-medium text-neutral-400">
              Tech Stack
            </h3>
            <div className="mt-3 flex flex-col gap-2.5">
              {techStack.map((item) => (
                <div key={item} className="text-sm text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default VercelCommentCard;