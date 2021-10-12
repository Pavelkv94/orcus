import { useParams } from "react-router";
import { Admin } from "./Admin/Admin";
import s from "./MainWindow.module.css"


export function MainWindow() {
    const { slug, catg } = useParams<{ catg: string, slug: string }>();
    // console.log(`CATEGORY--> ${catg} SLUG-->${slug}`)
    if (catg === "admin") {
        return <Admin/>
    } else
        return (
            <>{slug}</>
        )
}