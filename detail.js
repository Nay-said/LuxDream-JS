const prodId = parseInt(getUrlParam('prodId'))
const currentProduct = getProduct(prodId)
const imgUrl = "https://storage.googleapis.com/luxe_media/wwwroot/" + currentProduct.productMedia[0].url

document.getElementById('prodTitle').innerHTML = currentProduct.title
document.getElementById('desc').innerHTML = currentProduct.description
document.getElementById('price').innerHTML = `
  <h5>$ ${currentProduct.price}</h5>
`
document.getElementById('imgWrap').innerHTML = `
  <img src="${imgUrl}"/>
`

function getUrlParam(paramName) {
  const url = window.location.search.substring(1);
  const urlParams = new URLSearchParams(url);
  return urlParams.get(paramName);
}

function getProduct(Id) {
  let target;
  for (let prod of rawdata) {
    if (prod.prodId == Id) {
     return target = prod
    }
  }
  return target;
}