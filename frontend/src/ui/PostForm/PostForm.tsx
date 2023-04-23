import React, { useState, type FormEvent } from "react";
import * as css from "./PostForm.css.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { useSendPost } from "../../model/Post/useSendPost.js";

export const PostForm: React.FC = () => {
  const [text, setText] = useState("");
  const { sendPost, submitting, error } = useSendPost();

  const onPost = (e: FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    void sendPost({ body: text }).then(([error]) => {
      if (!error) {
        setText("");
      }
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

      {error && <p>{error.name}</p>}
    </form>
  );
};
