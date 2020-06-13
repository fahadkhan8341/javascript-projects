// API KEY = b66bcaa6aece4c9cbea36be4fe974c53
let apikey= 'b66bcaa6aece4c9cbea36be4fe974c53';
let source= 'bbc';
let newsaccordion = document.getElementById('newsaccordion');

let xhr=new XMLHttpRequest()
xhr.open('GET',`http://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`,true);
let loader=document.getElementById('loader');
xhr.onprogress= function(){
    loader.innerHTML=`<i>Please wait ...</i>`
}
xhr.onload= function(){
    if (this.status==200){
        loader.remove()
        let json= JSON.parse(this.responseText)
        let articles=json.articles;
        console.log(articles);
        newsHtml='';
        articles.forEach((element,index) => {
            let news=`
            <div class="card">
              <div class="card-header" id="heading${index}">
                <h2 class="mb-0">
                  <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    <b>News: #${index+1} </b>${element.title}
                  </button>
                </h2>
              </div>
          
              <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsaccordion">
                <div class="card-body">
                  ${element.content}<br><br>${element.description}
                  <a href="${element.url}" target="_blank">Click here</a> to read more.<br><br>
                  <i>${element.publishedAt} -- by <b><i>${element.author}</i></b></i>
                </div>
              </div>
            </div>`;
            newsHtml+=news;
        });
        newsaccordion.innerHTML=newsHtml;
        
    }
}
xhr.send();