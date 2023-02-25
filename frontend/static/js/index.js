//router
import Documentation from "./views/Documentation.js"
import Accueil from "./views/Accueil.js"
import Reglage from "./views/Reglage.js"
import Article from "./views/Article.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) =>{
        return [key, values[i]]
    }))
}

const router = async () => {

    const routes = [
        {path: "/", view:Accueil},
        {path: "/documentation", view:Documentation},
        {path: "/reglage", view:Reglage},
        {path: '/article/:id', view:Article}
    ]
    //match
    const potencialMatches = routes.map(route =>{
        return{
            route: route,
            //isMatch: location.pathname === route.path
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    //console.log(potencialMatches)
     let match = potencialMatches.find(potencialMatch => potencialMatch.result != null)

     if(!match){
         match = {
            route: routes[0],
            result: [location.pathname]
         }
     }
     //console.log(match)

     const view = new match.route.view(getParams(match))
     document.querySelector("#app").innerHTML = await view.getHtml()
}

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})