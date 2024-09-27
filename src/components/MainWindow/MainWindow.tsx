import s from "./MainWindow.module.css";
import ReactMarkdown from "react-markdown";
import { BackTop } from "antd";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getPostTC, PostType, resetPostAC } from "../../redux/postsReducer";
import { useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/store";

const MainWindow = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const post = useSelector<AppStateType, PostType>((state) => state.posts.post);

  useEffect(() => {
    dispatch(getPostTC(id!));

    return () => {
      dispatch(resetPostAC());
    };
  }, [dispatch, id]);

  return (
    <div className={s.mainWindow}>
      <ReactMarkdown className={s.mde} children={post?.text} />
      <BackTop>
        <div className={s.backTop}>UP</div>
      </BackTop>
    </div>
  );
});

export default MainWindow;
