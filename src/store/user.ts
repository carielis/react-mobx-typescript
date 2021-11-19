import { makeAutoObservable, runInAction } from "mobx";
import IUsers from '../types/User';
import { urls } from '../utils/url';



class Users {
    users: IUsers[]
    page : number
    postCount: null | number
    loading: boolean
    constructor() {
        makeAutoObservable(this)
        this.users = []
        this.page  = 1
        this.postCount  = null
        this.loading = false
    }

   async fetchUsers() {
       const fetchUser = await fetch(`${urls.users}?page=${this.page}`)
       return fetchUser
    }

    async fetchNewUsers() {
        this.loading = true
        const newUsersFetch = await this.fetchUsers()
        const newUsersResponse = await newUsersFetch.json()
        runInAction(() => {
            this.loading = false
            return this.users = [...this.users, ...newUsersResponse.data]
        })
    }


    async postFetch (userId: number) {
            const postsFetch = await fetch(`https://gorest.co.in/public-api/posts?user_id=${userId}`)
            const postsResponse = await postsFetch.json()
            const number: number = await postsResponse.data.length
            runInAction(() => {
                this.postCount = number
            })
        }
}

export default new Users();