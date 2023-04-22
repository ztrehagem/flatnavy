import React from "react";
import * as css from "./MainView.css.js";
import { PostForm } from "../PostForm/PostForm.jsx";
import { TimelineView } from "../TimelineView/TimelineView.jsx";

export const MainView: React.FC = () => {
  return (
    <div className={css.root}>
      <PostForm />

      <TimelineView />
    </div>
  );
};
