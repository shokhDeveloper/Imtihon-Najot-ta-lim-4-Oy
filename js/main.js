let parent = document.querySelector(".parrots-wrapper")
let template = document.querySelector("template").content
let nameInput = document.querySelector("#search")
let priceInput1 = document.querySelector("#from")
let priceInput2 = document.querySelector("#to")
let parentArray  = products

let object = {
    ab: function(a, b){
        if(a.title < b.title){
            return -1
        }else{
            return 1
        }
    },
    price_plyus: function(a,b){
        if(a.price < b.price){
            return 1
        }else{
            return -1
        }
    },
    price_height: function(a,b){
        if(a.sizes.height < b.sizes.height){
            return 1
        }else{
            return -1
        }
    },
    price_height_minus:function(a, b){
        if(a.sizes.height < b.sizes.height){
            return -1
        }else{
            return 1
        }
    },
    price_width: function(a,b){
        if(a.sizes.width < b.sizes.width){
            return -1
        }else{
            return 1
        }
    }
}
let handleSub = (e) => {
    e.preventDefault()
    let rejex = new RegExp(nameInput.value, "gi")
    let array = []
    if(nameInput.value === "all"){
        array = parentArray
    }else if(nameInput !=="all"){
        for(let i = 0; i<parentArray.length; i++){
            if(parentArray[i].title.match(rejex)){
               array = [...array, parentArray[i]]
            }
        }
        create(array)
    }
    let number1 = Number(priceInput1.value)
    let number2 = Number(priceInput2.value)
    if(Number(number1)){
    array = array.filter((item) => item.price > number1)
    array = array.filter((item) => number2>item.price)
    createFilters(array)
    }else{
        console.log(false)
    }
    let widthInput1 = document.querySelector("#from_width")
    let widthInput2 = document.querySelector("#to_width")
    if(Number(widthInput1.value) && Number(widthInput2.value)){
    array = array.filter((item) => item.sizes.width > widthInput1.value)
    array = array.filter((item) => widthInput2.value>item.sizes.width)
    createFilters(array)
    }else{
        console.log(false)
    }
    let heightInput1 = document.querySelector("#from_height")
    let heightInput2 = document.querySelector("#to_height")
    if(Number(heightInput1.value) && Number(heightInput2.value)){
    array = array.filter((item) => item.sizes.height > heightInput1.value)
    array = array.filter((item) => heightInput2.value>item.sizes.height)
    createFilters(array)
    }
    let selectValue = document.querySelector("#sortby")
    array.sort(object[selectValue.value])
    console.log(array)
    create(array)
}
document.querySelector("form").addEventListener("submit", handleSub)
document.querySelector(".for_create_card_local").addEventListener("submit", handleCreate)
let kakatuInput = document.querySelector("#parrot-title")
let kakatuImg = document.querySelector("#parrot-img")
let kakatuPrice = document.querySelector("#price")
let kakatuDate = document.querySelector("#parrot-date")
let kakatuWidth = document.querySelector("#parrot_width")
let kakatuHeight = document.querySelector("#parrot_height")
let kakatuFeatures = document.querySelector("#features")
let createCardArray = []
let createCardObject = {
    id: null,
    name: null,
    img: null,
    price: null,
    birthDate: null,
    width: null,
    height: null,
    features: null,
    isFavorite : true
}
function handleCreate(e){
    e.preventDefault()
    createCardObject.id = kakatuInput.value
    createCardObject.name = kakatuInput.value
    createCardObject.img = kakatuImg.value
    createCardObject.price = kakatuPrice.value
    createCardObject.birthDate = kakatuDate.value
    createCardObject.width = kakatuWidth.value
    createCardObject.height = kakatuHeight.value
    createCardObject.features = kakatuFeatures.value
    createCardArray =[...createCardArray , createCardObject]
    createCardLocals(createCardArray)
}
let trueFalses  = [true, false, true, false , true, false]
let kakatuRandomImg = ["https://cdn-fastly.petguide.com/media/2022/02/16/8233420/blue-and-gold-macaw.jpg?size=720x845&nocrop=1", "https://www.thesprucepets.com/thmb/iSTnB0H4nROEXkEkCYXztQjYRy0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-545596762-5aee81c5875db90037634e10.jpg", "https://media.istockphoto.com/photos/red-tailed-black-cockatoo-picture-id1165028488?k=20&m=1165028488&s=612x612&w=0&h=80etTy7sIUlYRIQ8yaN7JOSc_R4jzQe7sDlUwwvSENs=", "https://www.tashkentzoo.uz/uploads/animals/c793d79b7cd1fb849e43f3e6e8719bb9.jpg"]
function createCardLocals(arr){
    let tanlaTrueFalses = trueFalses[Math.trunc(Math.random() * 6)]
    let tanlaImg = kakatuRandomImg[Math.trunc(Math.random() * 12 % 3 )]
    for(let i = 0; i<arr.length; i++){ 
        let clone = template.cloneNode(true)
        let title = clone.querySelector(".card-title")
        title.textContent = arr[i].name
        let img = clone.querySelector(".card-img-top")
        img.src = tanlaImg
        let price = clone.querySelector(".card-text mark")
        price.textContent = `$${arr[i].price }`
        let widthHeight = clone.querySelector(".badge")
        widthHeight.textContent = `${arr[i].width}sm x ${arr[i].height}`
        object.isFavorite = tanlaTrueFalses
        let bateiful = clone.querySelector(".bates")
        bateiful.textContent = arr[i].features
        let zvezda = clone.querySelector(".zvezda")
        zvezda.dataset.id = arr[i].name
        let btnI = clone.querySelector(".btn i")
        if(arr[i].isFavorite === false){
            btnI.className = "fa-solid fa-star"
        }else{
            btnI.className = "fa fa-star-o"
        }
        parent.appendChild(clone)    
    }
}
    function createFilters(array){
    parent.innerHTML = null
    for(let i = 0; i<array.length; i++){
    let cloun = template.cloneNode(true)
    let name = cloun.querySelector(".card-title")
    name.textContent = array[i].title
    // console.log(name)
    let img = cloun.querySelector(".card-img-top")
    img.src = array[i].img
    // console.log(img)
    let price = cloun.querySelector(".card-text mark")
    price.textContent = `$${array[i].price }`
    let widthHeight = cloun.querySelector(".badge")
    let object = array[i].sizes
    widthHeight.textContent = `${object.width}sm x ${object.height}`
    let btnI = cloun.querySelector(".btn i")
    if(array[i].isFavorite === false){
        btnI.className = "fa-solid fa-star"
    }else{
        btnI.className = "fa fa-star-o"
    }
    parent.appendChild(cloun)
}
}
function create(array){
    parent.innerHTML = null
    for(let i = 0; i<array.length; i++){
    let cloun = template.cloneNode(true)
    let name = cloun.querySelector(".card-title")
    name.textContent = array[i].title
    // console.log(name)
    let img = cloun.querySelector(".card-img-top")
    img.src = array[i].img
    // console.log(img)
    let price = cloun.querySelector(".card-text mark")
    price.textContent = `$${array[i].price }`
    let widthHeight = cloun.querySelector(".badge")
    let object = array[i].sizes
    widthHeight.textContent = `${object.width}sm x ${object.height}`
    let btnI = cloun.querySelector(".btn i")
    if(array[i].isFavorite === false){
        btnI.className = "fa-solid fa-star"
    }else{
        btnI.className = "fa fa-star-o"
    }
    parent.appendChild(cloun)
}
}
window.addEventListener("click", (e) => {
    if(e.target.matches(".delete")){
      let btn = e.target
      let btnParent = btn.parentNode
      let btnParentParent = btnParent.parentNode
      btnParentParent.parentNode.remove()
    }else{
        console.log(false)
    }
})
let defaultObject = {
    name: null
}
let locals = document.querySelector(".locals")
window.addEventListener("click", (e) => {
    if(e.target.matches(".zvezda")){
        let id = e.target.dataset.id
        for(let i = 0; i<products.length; i++){
            if(products[i].id === Number(id)){
                defaultObject.name = products[i].title
                window.localStorage.setItem("defaultObject", JSON.stringify(defaultObject))
                let h3s = document.createElement("h3")
                h3s.textContent = JSON.parse(window.localStorage.getItem("defaultObject")).name
                locals.appendChild(h3s)              
            }else{
              console.log(false)
            }
        }
        for(let i = 0; i<createCardArray.length; i++){
            if(id == createCardArray[i].id){
                console.log(createCardArray[i])
                window.localStorage.setItem("kakatuObject", JSON.stringify(createCardArray[i]))
                let img = document.createElement("img")
                console.log(JSON.parse(window.localStorage.getItem("kakatuObject")).name)  
                let h2 = document.createElement("h2")
                h2.textContent = JSON.parse(window.localStorage.getItem("kakatuObject")).name
                locals.appendChild(h2)
                console.log(locals)
            }else{
                console.log("Xato")
            }
        }              
    }
})
let h3s = document.createElement("h3")
h3s.textContent = JSON.parse(window.localStorage.getItem("defaultObject")).name
locals.appendChild(h3s)
let h2 = document.createElement("h2")
h2.textContent = JSON.parse(window.localStorage.getItem("kakatuObject")).name
locals.appendChild(h2)
console.log(locals)