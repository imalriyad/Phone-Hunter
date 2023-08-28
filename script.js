
const loadPhones = (searchText= 'i',isShowAll)=>{
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
 .then(res => res.json())
 .then(data => getPhoneData(data,isShowAll))
}

// phones showing
function getPhoneData(phonesDetails,isShowAll){
   const cardContainer = document.getElementById('cardContainer')
   cardContainer.innerHTML = ''
   const numberOfPhones = phonesDetails.data.length
   let numberOfPhoneDisplay = phonesDetails.data
   console.log(isShowAll);
   let numberOfPhoneDisplays = numberOfPhoneDisplay.slice(0,6)
  
   if (numberOfPhones > 6) {
    const showAllButton = document.getElementById('showAllButton') 
    showAllButton.classList.remove('hidden')
   }
   else{
    showAllButton.classList.add('hidden')
   }

   numberOfPhoneDisplays.forEach(phones => {
    const PhoneBrands = phones.brand
    const phoneNames = phones.phone_name
    const phoneImage = phones.image
    const phoneId = phones.slug
    const phoneCard = document.createElement('div')
    phoneCard.innerHTML = `
    <div class="mx-auto max-w-screen-xl py-2 px-4 mt-10">
          <div class="card md:p-4 border-[1px] border-[#CFCFCF]">
              <figure class="bg-[#0D6EFD0D] h-[220px]">
                <img src="${phoneImage}" alt="phone" />
              </figure>
              <div class="card-body items-center text-center space-y-2">
                <h2 id="phoneName" class="card-title md:text-2xl text-lg">${phoneNames}</h2>
                <p class="text-[#706F6F] md:text-base text-xs">There are many variations of passages of available, but the majority have suffered</p>
                <h1 class="font-bold text-2xl">$999</h1>
                <div class="badge cursor-pointer badge-primary badge-outline">${PhoneBrands}</div>
                <div class="card-actions">
                <button onclick="showMore('${phoneId}'); showDetailsModal.showModal()" class="bg-[#0D6EFD]  hover:bg-[#0D6EFD] py-3 mt-2 text-white text-sm normal-case md:px-6 px-4 rounded-md">Show More</button>  
           </div>
            </div>
           </div>
            </div>`

       cardContainer.appendChild(phoneCard)
        
  });
  spinner(false)
}

// Seaerch fetures
const searchBtn = (isShowAll) => {
  spinner(true)
  const searchfield = document.getElementById('searchBox')
  const searchText = searchfield.value
  loadPhones(searchText,isShowAll)
 
}

// Spinner
function spinner(isLoading){
  const loadingSpinner = document.getElementById('loading-spinner')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const showAllButton = () =>{
  searchBtn(true)

}

const showMore = (phoneId) =>{
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
 .then(res => res.json())
 .then(data => showDetailsPhones(data))
}

const showDetailsPhones = (data) =>{
       const phones = data.data
       console.log(phones);
       const modalContainer = document.getElementById('modal-container')
       modalContainer.innerHTML = `
       <div class="bg-[#0D6EFD0D]"> <img src="${phones.image}" class="mx-auto h-[220px]" alt=""></div>
            <h3 class="font-bold md:text-2xl text-lg mt-6">${phones.name}</h3>
            <p class="py-4 text-[#706F6F] md:text-sm text-xs">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <div class="md:space-y-2 space-y-1">
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Storage : </h1> <span class="md:text-sm text-[8px]">${phones.mainFeatures.storage}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Display Size : </h1> <span class="md:text-sm text-[8px]">${phones.mainFeatures.displaySize}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Chipset : </h1> <span class="md:text-sm text-[8px]">${phones.mainFeatures.chipSet}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Slug : </h1> <span class="md:text-sm text-[8px]">${phones.slug}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Memory: </h1> <span class="md:text-sm text-[8px]">${phones.mainFeatures.memory}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Release Date : </h1> <span class="md:text-sm text-[8px]">${phones.releaseDate}</span>
              </div>
              <div class="flex gap-x-2 items-center ">
                <h1 class="font-bold md:text-base text-[11px]">Brand : </h1> <span class="md:text-sm text-[8px]">${phones.brand}</span>
              </div>
              <div class="flex gap-x-2 items-center">
                <h1 class="font-bold md:text-base text-[11px]">GPS:</h1><span class="md:text-sm text-[8px]">${phones?.others?.GPS ?phones?.others?.GPS : 'NO GPS'}</span>
              </div>
            </div>
        
            <div class="modal-action">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn bg-[#DC3545] hover:bg-[#DC3545] text-white normal-case">Close</button>
            </div>
       
       `
}

loadPhones()