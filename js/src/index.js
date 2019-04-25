// recent
const olapicApi = "https://photorankapi-a.akamaihd.net/customers/215757/media/recent?rights_given=1&include_tagged_galleries=0&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2";

// photorank
// const olapicApi = "https://photorankapi-a.akamaihd.net/customers/215757/media/photorank?rights_given=1&include_tagged_galleries=0&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2";

// rated 
// const olapicApi = "https://photorankapi-a.akamaihd.net/customers/215757/media/rated?rights_given=1&include_tagged_galleries=0&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2";
let mediaArray = [];

var vm = new Vue({
    el: "#app",
    data: {
        responses: "",
        groups: [],
        seen: true 
    }
  })

axios.get(olapicApi)
.then(data => { 
    console.log(data.data.data._embedded.media)
   const mediaArray = [...data.data.data._embedded.media].map(element => element.images.normal);
   let mediaArrayGrouped = [];
   function buildGroup(array){
       const subArray = [];
       for(let i=0; i<5; i++){
           subArray.push(array[i]);
       }
       array = array.slice(5);
       mediaArrayGrouped.push(subArray);
       if(array.length > 0){
           buildGroup(array);
       };
   };
   buildGroup(mediaArray);
   vm.responses = mediaArrayGrouped;

   vm.groups.push(vm.responses[0]); 
   vm.responses = vm.responses.slice(1);

   });

   const moreImages = document.querySelector('#more');

   moreImages.addEventListener("click", (e) => {
       e.preventDefault();
       
  if(vm.responses.length > 0){ 
   vm.groups.push(vm.responses[0]); 
   vm.responses = vm.responses.slice(1);
   if(vm.responses.length == 0){
       vm.seen = false;
    // document.querySelector('#more').classList.add('hidden')
   }
  }
   })

