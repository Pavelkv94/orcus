import s from "./MainWindow.module.css"
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import ReactMarkdown from 'react-markdown'
import { BackTop } from "antd";
import { useParams, Navigate } from 'react-router';
import { useDispatch } from 'react-redux';
import React, { Dispatch, useEffect } from "react";
import { getPostTC } from "../../redux/filterReducer";
import { RequestStatusType } from "../../redux/appReducer";
import { Preloader } from "../../Preloder";

export const MainWindow = React.memo(() => {
	const { id } = useParams<{ id: string }>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: Dispatch<any> = useDispatch();
	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
	
	useEffect(() => { dispatch(getPostTC(id)) }, [dispatch, id])
	const post = useSelector<AppStateType, PostType>(state => state.filter);
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);

	
	if (status === "loading") { return <Preloader /> }
	if (!isAuth) {
		return <Navigate to="/login" />
	} else {
	return (

		<div className={s.mainWindow}>
			<ReactMarkdown
				className={s.mde} children={post?.text}/>
			<BackTop>
				<div className={s.backTop}>UP</div>
			</BackTop>
		</div>
	)}
})