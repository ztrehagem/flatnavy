import React from "react";
import * as css from "./MainView.css.js";
import { PostForm } from "../PostForm/PostForm.jsx";
import { TimelineView } from "../TimelineView/TimelineView.jsx";
import { useSession } from "../../model/Session/useSession.js";

export const MainView: React.FC = () => {
  const session = useSession();

  return (
    <div className={css.root}>
      {session && <PostForm />}

      <TimelineView />
    </div>
  );
};
