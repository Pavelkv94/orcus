import axios from 'axios'

let h = new Headers();
h.append("Content-Type", "application/json");
const instance = axios.create({
	baseURL: "https://orcuserver.herokuapp.com/",
});

export const API = {
	createCategory(title: any) {
		return instance.post('/categories', { title: title })
	},
	getCategories() {
		return instance.get('/categories')
	},
	createPost(title: string, slug: string, category: string, text: string ) {
		return instance.post('/posts', { title, slug, category, text })
	},
	getPosts() {
		return instance.get('/posts')
	},
	getFilterPosts(category:string) {
		return instance.get(`/posts/${category}`)
	},
	getPost(id:string) {
		return instance.get(`main/${id}`)
	},
}