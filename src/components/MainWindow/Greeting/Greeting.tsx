import { AppStateType } from "../../../redux/store"
import s from "./Greeting.module.css"
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
import React from 'react';


export const Greeting = React.memo(() => {
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);

	if (!isAuth) {
		return <Redirect to={"/login"} />
	} else {
		return (
			<div className={s.greet}>
				<div></div>
				<h2>Hello</h2>
				<p>This is orcus app. </p>
				<div></div>
			</div>
		)
	}
})