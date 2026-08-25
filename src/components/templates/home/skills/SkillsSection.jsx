import React from "react";
import SkillsList from "./components/SkillsList";
import SkillsIconsBox from "./components/SkillsIconsBox";

const SkillsSection = () => {
  return (
    <div className="container py-37 flex flex-col">
      <div className="flex w-full flex-col-reverse items-stretch gap-5 md:flex-row md:gap-10">
        <div className="w-full md:w-1/2">
          <SkillsList />
        </div>
        <SkillsIconsBox />
      </div>
    </div>
  );
};

export default SkillsSection;