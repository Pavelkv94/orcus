import s from "./Admin.module.css"
import "react-mde/lib/styles/css/react-mde-all.css";
import { AdminForm } from "./AdminForm/AdminForm";
import { PostList } from "./PostList/PostList";
export function Admin() {

    return (
        <div className={s.adminContainer}>
            <AdminForm />
            <hr />
            <PostList />
        </div>
    )

}