import s from "./MainWindow.module.css"
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import ReactMarkdown from 'react-markdown'
import { BackTop } from "antd";
import { Redirect, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { getPostTC } from "../../redux/filterReducer";
import { Preloader } from "../../Preloder";
import { RequestStatusType } from "../../redux/appReducer";

export const MainWindow = React.memo(() => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
	useEffect(() => { dispatch(getPostTC(id)) }, [dispatch, id])
	const post = useSelector<AppStateType, PostType>(state => state.filter.post);
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);
	if (isAuth) {
		return <Redirect to="/login" />
	}
	if (status === "loading") { return <Preloader /> }
	return (

		<div className={s.mainWindow}>

			<h2>{post?.title}</h2>
			<ReactMarkdown
				className={s.mde}
			>{post?.text}</ReactMarkdown>
			<BackTop>
				<div className={s.backTop}>UP</div>
			</BackTop>
		</div>
	)
})