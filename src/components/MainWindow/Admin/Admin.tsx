import s from "./Admin.module.css"
import "react-mde/lib/styles/css/react-mde-all.css";
import { AdminForm } from "./AdminForm/AdminForm";
import { PostList } from "./PostList/PostList";
import { Preloader } from "../../../Preloder";
import { useSelector } from 'react-redux';
import { AppStateType } from "../../../redux/store";
import { RequestStatusType } from "../../../redux/appReducer";
import { Redirect } from "react-router";
import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { getPostsTC } from "../../../redux/postsReducer";

export const Admin = React.memo(() => {

	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostsTC())
	}, [dispatch]);

	if (isAuth) {
		return <Redirect to="/login" />
	}
	return (<>
		{status === "loading" && <Preloader />}
		<div className={s.adminContainer}>
			<AdminForm />
			<hr />
			<PostList />
		</div></>
	)

})