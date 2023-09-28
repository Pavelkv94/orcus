import s from "./Admin.module.css"
import "react-mde/lib/styles/css/react-mde-all.css";
import { AdminForm } from "./AdminForm/AdminForm";
import { useSelector } from 'react-redux';
import { AppStateType } from "../../../redux/store";
import { RequestStatusType } from "../../../redux/appReducer";
import { Navigate } from "react-router";
import React from "react";
import { Preloader } from "../../../Preloder";

export const Admin = React.memo(() => {

	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);

	if (!isAuth) {
		return <Navigate to="/login" />
	} else {
		return (<>
			{status === "loading" && <Preloader />}
			<div className={s.adminContainer}>
				<AdminForm />
				<hr />
			</div></>
		)
	}


})