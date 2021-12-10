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
				<h3>This is orcus app. Good luck!</h3>
				<div></div>
				<section className={s.warning}>
					<p>The developer of this application is not responsible for any consequences of its use.<br/> All materials are provided for educational purposes only!</p>
					<p>Разработчик данного приложения не несет ответственности за любые последствия его использования.<br/> Все материалы предоставлены исключительно в образовательных целях!</p>
				</section>
			</div>
		)
	}
})