import React, { useState, type FormEvent } from "react";
import * as css from "./PostForm.css.js";
import { apiClientContext } from "../../lib/api.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { createPost } from "@flatnavy/api/client";

export const PostForm: React.FC = () => {
  const [text, setText] = useState("");

  const onPost = (e: FormEvent) => {
    e.preventDefault();

    void createPost(apiClientContext)({ body: text }).then(() => {
      setText("");
    });
  };

  return (
    <form onSubmit={onPost} className={css.root}>
      <div className={css.postHeader}>
        <div></div>

        <button type="submit" className={css.submitButton}>
          <MaterialSymbol name="send" />
          <span className={css.submitText}>Post</span>
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="what you say"
        className={css.textarea}
      ></textarea>
    </form>
  );
};
