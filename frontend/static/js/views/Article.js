import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Affichage article")
    }

    async getHtml() {
       // console.log(this.params.id)
        const nu  = Number(this.params.id)

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const article = await getData('/api/donnees/' + nu)
        return `
        <h1>`+article.title+`</h1>
        <article class="article">
            <div>
                <p>`+article.description+`</p>
                <p>`+article.content+`</p>
                <p>`+article.publishedAt+`</p>
                <p>source: <a href="`+article.url+`">`+article.url+`</a></p>
                <strong>`+article.author+`</strong>
            </div>
            <img src="`+article.urlToImage+`"/>
        </article>
        <p><a href='/post' data-link>Retour</a></p>
        `;
    }
}