import s from "./Admin.module.css"
import "react-mde/lib/styles/css/react-mde-all.css";
import { AdminForm } from "./AdminForm/AdminForm";
import { PostList } from "./PostList/PostList";
import { Preloader } from "../../../Preloder";
import { useSelector } from 'react-redux';
import { AppStateType } from "../../../redux/store";
import { RequestStatusType } from "../../../redux/appReducer";

export function Admin() {
	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
	return (<>
	{status === "loading" && <Preloader />}
		<div className={s.adminContainer}>
			<AdminForm />
			<hr />
			<PostList />
		</div></>
	)

}