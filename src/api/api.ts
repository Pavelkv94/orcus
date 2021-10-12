import axios from 'axios'

let h = new Headers();
h.append("Content-Type", "application/json");
const instance = axios.create({
    baseURL: "http://localhost:3002",
});

export const catAPI = {
	createCat(title:any){
		return instance.post('/categories', {title : title})
	},
	getCat(){
		return instance.get('/categories')
	},
}