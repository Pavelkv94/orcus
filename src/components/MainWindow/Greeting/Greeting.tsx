import { AppStateType } from "../../../redux/store"
import s from "./Greeting.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router";
import React, { Dispatch, useEffect } from 'react';
import { getCategoriesTC } from "../../../redux/categoriesReducer";
import { getShortPostsTC } from "../../../redux/postsReducer";


export const Greeting = React.memo(() => {
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: Dispatch<any> = useDispatch();
	useEffect(() => {
		dispatch(getCategoriesTC());
	}, [dispatch]);


	useEffect(() => {
		dispatch(getShortPostsTC());
	}, [dispatch]);

	if (!isAuth) {
		return <Navigate to={"/login"} />
	} else {
		return (
			<div className={s.greet}>
				<div></div>
				<h2>Hello</h2>
				<h3>This is Orcus app. Good luck!</h3>
				<div></div>
				<section className={s.warning}>
					<p>The developer of this application is not responsible for any consequences of its use.<br/> All materials are provided for educational purposes only!</p>
					<p>Разработчик данного приложения не несет ответственности за любые последствия его использования.<br/> Все материалы предоставлены исключительно в образовательных целях!</p>
				</section>
			</div>
		)
	}
})