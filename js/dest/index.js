"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    var olapicApi = "https://photorankapi-a.akamaihd.net/customers/215757/media/recent?rights_given=1&include_tagged_galleries=0&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2";
    // const olapicApi = "https://photorankapi-a.akamaihd.net/customers/215757/media/rated?rights_given=1&include_tagged_galleries=0&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2";
    var vm = new Vue({
        el: "#app",
        data: {
            responses: "",
            groups: [],
            seen: true
        }
    });
    var moreImages = document.querySelector('#more');
    var showImages = function showImages() {
        if (vm.responses.length > 0) {
            vm.groups.push(vm.responses[0]);
            vm.responses = vm.responses.slice(1);
            if (vm.responses.length == 0) {
                vm.seen = false;
            }
        }
    };
    moreImages.addEventListener("click", function (e) {
        e.preventDefault();
        showImages();
    });
    axios.get(olapicApi).then(function (data) {
        // console.log(data.data.data._embedded.media)
        var mediaArray = [].concat(_toConsumableArray(data.data.data._embedded.media)).map(function (element) {
            return element.images.normal;
        });
        var mediaArrayGrouped = [];

        function buildGroup(array) {
            var subArray = [];
            for (var i = 0; i < 5; i++) {
                subArray.push(array[i]);
            }
            array = array.slice(5);
            mediaArrayGrouped.push(subArray);
            if (array.length > 0) {
                buildGroup(array);
            };
        };
        buildGroup(mediaArray);
        vm.responses = mediaArrayGrouped;
        showImages();
    });
})();