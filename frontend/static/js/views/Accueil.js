import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("News")
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/api/donnees')
        const articles = data.articles
        let listPosts = "<ul>"
        for(let i in articles){
            listPosts += "<li><a href='/article/" + i + "' data-link>" + articles[i]['title'] + "</a></li>"
        }
        listPosts +="</ul>"

        return `
        <h1>News</h1>
        `+listPosts;
    }
}