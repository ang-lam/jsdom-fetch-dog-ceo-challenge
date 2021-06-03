
const container = document.querySelector("#dog-image-container")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulContainer = document.querySelector("#dog-breeds")
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray;

//event listener should be in scope of parent so it's not lost when changed in future
ulContainer.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)



// - on page load, fetches the images using the url above ⬆️
// - parses the response as `JSON`
// - adds image elements to the DOM **for each** 🤔 image in the array
function getImages() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
    const imgs = images.message
    let imgsArray = createImgElement(imgs)
    renderImgs(imgsArray)
    })
}
// fetch(imgUrl) //fetch request
// .then(resp => resp.json()) //take respons and turn it into json
// .then(images => { //receive back the data and do something with it
//     const imgs = images.message
//     let imgsArray = createImgElement(imgs)
    
    //take this array of images
    //turn it into img elements
        //forEach is like .each in ruby -> returns original array
        //map goes through each element of the array and modifies it
    // let imgsArray = imgs.map((img) => { 
    //     let i = `<img src=${img}>`
    //     //document.createElement can be used
    //     return i //return in map is important - does not modify unless returned
        
    // });
    // imgsArray.forEach(element => {
    //     // container.append(element) //does not work because we used template literal (recognized as string not as node)
    //     container.innerHTML += element //adds next element, does not overwrite, this appends
    // });
    //append each element to the DOM

function createImgElement(imgs) {
    return imgs.map((img) => { 
        let i = `<img src=${img}>`
        //document.createElement can be used
        return i //return in m
    })
}

function renderImgs(imgsArray) {
    imgsArray.forEach(element => {
        renderElements(container, element)
    })
}

function renderElements(container, element) {
    container.innerHTML += element
}

function getBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => { //breeds returns an object (key/value pairs)
        //want to turn keys into array so we can iterate over it
        breedsArray = Object.keys(breeds.message)
        //create li elements for inside ul container
        const breedsLis = createLiElement(breedsArray)
        //take array of lis and append to ul container
        renderLis(breedsLis)


    })
}

function createLiElement(breedsArray) {
    return breedsArray.map((breed) => { 
        let li = `<li>${breed}</li>`
        return li
    })
} //returns li elements in an array

function renderLis(breedsLis) {
    breedsLis.forEach(element => {
        renderElements(ulContainer, element)
    })
}

function handleClick(event){
    //event.traget tells you which element triggered the event
    if (event.target.nodeName === 'LI') {
        if (event.target.style.color === 'red'){
            event.target.style.color = 'black'
        } else {
            event.target.style.color = "red"
        }
    }
   
}

function handleChange(event){
    const letter = event.target.value
    
    //filter out the breeds that start with the letter
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    //append filteredBreeds to the DOM
    const filteredBreedsLis = createLiElement(filteredBreeds)
    ulContainer.innerHTML = ''
    renderLis(filteredBreedsLis)

}

getImages()
getBreeds()

