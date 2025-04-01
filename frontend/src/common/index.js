const backendDomain = "http://localhost:5555"; 


const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "POST"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "GET"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "GET"
    },
    allUsers: {
        url: `${backendDomain}/api/all-user`,
        method: "GET"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "POST"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'POST'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'GET'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'POST'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    }

}

export default SummaryApi
