import React from "react";
import * as css from "./MainView.css.js";
import { PostForm } from "../PostForm/PostForm.jsx";
import { TimelineView } from "../TimelineView/TimelineView.jsx";
import { useSession } from "../../model/Session/useSession.js";
import { SectionHeader } from "../Section/SectionHeader.jsx";

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
