let state = []

onInit()

function onInit() {
  state = rawdata
  randerData(state)
}

filterHandler = filterName => {
  if(filterName === 'cate') {
    const cateId = document.getElementById('cateSelect').value
    setURLSearchParam('categoryId', cateId)
    filterCategory(cateId)
  }
  if(filterName === 'price') {
    const priceRange = document.getElementById('priceSelect').value
    setURLSearchParam('priceRange', priceRange)
    filterPrice(priceRange)
  }
  if(filterName === 'asc') {
    setURLSearchParam('sort', 'asc')
    asc()
  }
  if(filterName === 'desc') {
    setURLSearchParam('sort', 'desc')
    desc()
  }
}

function filterCategory(cateId) {
  state = []
  for(let product of rawdata) {
		if(product.categoryId == cateId || cateId == "0") {
			state.push(product)
		}
	}
  randerData(state)
} 

function filterPrice(priceRange) {
  console.log(state);
  let filteredProds = []
  for(let product of state) {
		if(priceRange == 0) {
			filteredProds = state
		}
		if(product.price <= 100 && priceRange == 100) {
			filteredProds.push(product)
		}
		if(product.price > 100 && product.price <= 500 && priceRange == 500) {
			filteredProds.push(product)
		}
		if(product.price > 500 && product.price <= 1000 && priceRange == 1000) {
			filteredProds.push(product)
		}
		if(product.price > 1000 && priceRange == 1001) {
			filteredProds.push(product)
		}
	}
  randerData(filteredProds)
}

function randerData(data) {
  let productsForRander = ''
  for(let product of data) {
    if(product.productMedia[0] && product.productMedia[0].url) {
      const imgSrc = `https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}`
      const urlParam = `./detail.html?prodId=${product.prodId}`
      const viewTemplate = `
        <div class="col-12 col-md-6 col-xl-3 mb-3">
          <a href="${urlParam}">
            <div id="prod-img-wrap">
              <img src="${imgSrc}">
            </div>
            <p id="title">${product.title}</p>
            <p id="price">$ ${product.price}</p>
          </a>
        </div>`
      productsForRander += viewTemplate
    }
  }
  document.getElementById('prodList').innerHTML = productsForRander
}

function asc() {
  state.sort((A, B) => {
    const valueA = A.price
    const valueB = B.price
    if (valueB < valueA) return 1
    else if (valueB > valueA) return -1
    else return 0
  })
  randerData(state)
}

function desc() {
  state.sort((A, B) => {
    const valueC = A.price
		const valueD = B.price
		if (valueC < valueD) return 1
		else if (valueC > valueD) return -1
		else return 0
  })
  randerData(state)
}

function setURLSearchParam(key, value) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.pushState({ path: url.href }, '', url.href)
}

function resetFilter() {
  let url = new URL(window.location.href)
  url.searchParams.delete('categoryId')
  url.searchParams.delete('priceRange')
  url.searchParams.delete('sort')
  window.history.pushState({ path: url.href }, '', url.href)
  state = rawdata
  document.getElementById('cateSelect').value = 0
  document.getElementById('priceSelect').value = 0
  randerData(rawdata)
}