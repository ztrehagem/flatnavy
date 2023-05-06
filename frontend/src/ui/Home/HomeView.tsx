import React from "react";
import { PostForm } from "../PostForm/PostForm.js";
import { TimelineView } from "../Timeline/TimelineView.js";
import { useSession } from "../../model/Session/useSession.js";
import { SectionHeader } from "../Section/SectionHeader.js";
import * as css from "./HomeView.css.js";

export const MainView: React.FC = () => {
  const session = useSession();

  return (
    <div className={css.root}>
      {session && <PostForm />}

      <SectionHeader>Timeline</SectionHeader>
      <TimelineView />
    </div>
  );
};
