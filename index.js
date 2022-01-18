let state = []
getInitData()

function getInitData() {
  state = rawdata
  randerData()
}

function randerData() {
  let productsForRander = ''
  for(let product of state) {
    if(product.productMedia[0] && product.productMedia[0].url) {
      const imgUrl = "https://storage.googleapis.com/luxe_media/wwwroot/" + product.productMedia[0].url
      const urlParam = "./detail.html?prodId=" + product.prodId
      const viewTemplate = `
        <div class="col-12 col-md-2 mb-3">
          <a href="${urlParam}">
            <img src="${imgUrl}">
            <p id="title">${product.title}</p>
            <p id="price">$ ${product.price}</p>
          </a>
        </div>`
      productsForRander += viewTemplate
    }
  }
  document.getElementById('prodList').innerHTML = productsForRander;
}