import axios from 'axios'

let h = new Headers();
h.append("Content-Type", "application/json");
const instance = axios.create({
	baseURL: "https://localhost:3002",
});

export const API = {
	createCategory(title: any) {
		return instance.post('/categories', { title: title })
	},
	getCategories() {
		return instance.get('/categories')
	},
	createPost(title: string, category: string, text: string) {
		return instance.post('/posts', { title, category, text })
	},
	getPosts() {
		return instance.get('/posts')
	},
	getPost(id: string) {
		return instance.get(`main/${id}`)
	},
	addPostToCategory(post: string, category: string) {
		return instance.put('/categories', { newPost: post, category })
	}

}