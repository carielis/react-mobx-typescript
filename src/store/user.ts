import { makeAutoObservable, runInAction } from "mobx";
import IUsers from '../types/User';
import IPost from '../types/Post';



class Users {
    users: IUsers[]
    page : number
    postCount: any
    loading: boolean
    constructor() {
        makeAutoObservable(this)
        this.users = []
        this.page  = 1
        this.postCount  = 1
        this.loading = false
    }

   async fetchUsers() {
       const fetchUser = await fetch(`https://gorest.co.in/public-api/users?page=${this.page}`)
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

    async getPostsUser(id: number) {
        const postsFetch = await fetch(`https://gorest.co.in/public-api/posts?user_id=${id}`)
        
        const postsResponse = await postsFetch.json()
        const number: IPost[] = await postsResponse.data.length
        runInAction(() => {
            this.postCount = number
        })
     }

     async setUserCountPost() {
         runInAction(async () => {
            //  return await this.getPostsUser(id:)
         })
     }

}

export default new Users();