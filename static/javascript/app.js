const pubBtn = document.getElementById("publishBtn");


/* const getSelectedArticles = new Promise(){
    return document.querySelectorAll('input[name=article_chk_box]:checked');
} */

//Update Published articles


pubBtn.addEventListener("click", ()=> {
    var selectedarticles = document.querySelectorAll('input[name=article_chk_box]:checked');
    var articleIdList = [];
    var targetUrl = '/admin/articles/publish';
    
    selectedarticles.forEach((article, index) => {
        articleIdList.push(article.id);
    })

    $.ajax({
        url: targetUrl,
        data: {"articleIdList" : articleIdList},
        type: 'POST',
        dataType: 'application/json'
    }).done(function (data) {
        console.log("Updated");
    })

})