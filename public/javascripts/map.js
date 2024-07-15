const mapContainer = document.getElementById("map");
const mapOption = {
    center: new kakao.maps.LatLng(35.176537, 126.905384),
    level: 4,
};

let map = new kakao.maps.Map(mapContainer, mapOption);

//11번 code 부턴 secmap code 가져옴

let infowindow = new kakao.maps.InfoWindow({
    zIndex: 1,
});

let markerList = [];

let ps = new kakao.maps.services.Places();

searchPlaces();

function searchPlaces() {
    let keyword = $("#keyword").val(); // 사용자가 입력한 키워드.
    const jnuCoords = [
        new kakao.maps.LatLng(35.178357, 126.903509),
        new kakao.maps.LatLng(35.180549, 126.904003),
        new kakao.maps.LatLng(35.182095, 126.909447),
        new kakao.maps.LatLng(35.181376, 126.911185),
        new kakao.maps.LatLng(35.179324, 126.911893),
        new kakao.maps.LatLng(35.174027, 126.912709),
        new kakao.maps.LatLng(35.172554, 126.908997),
        new kakao.maps.LatLng(35.172308, 126.904619),
        new kakao.maps.LatLng(35.171484, 126.899341),
        new kakao.maps.LatLng(35.173027, 126.896122),
        new kakao.maps.LatLng(35.176886, 126.899019),
        new kakao.maps.LatLng(35.178324, 126.903418)
    ];
    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < jnuCoords.length; i++) {
        bounds.extend(jnuCoords[i]);
    }

    const options = {
        bounds: bounds
    };

    let regex = /(공|경)(\d+)/;
    let match = keyword.match(regex);

    if (match) {
        let buildingName = match[1];
        let buildingNumber = match[2];
        let buildingFullName = "";

        if (buildingName === "공") {
            buildingFullName = "공과대학 " + buildingNumber + "호관";
        } else if (buildingName === "경") {
            buildingFullName = "경영대학 " + buildingNumber + "호관";
        }

        ps.keywordSearch(buildingFullName, placesSearchDB, options);
    } else {
        ps.keywordSearch(keyword, placesSearchDB, options);
    }
}

function placesSearchDB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("올바른 키워드로 검색하세요!!");
        return;
    } else if (status === kakao.maps.services.Status.ERROR0) {
        alert("검색 결과중 오류 발생");
        return;
    }
}

function displayPlaces(data) {
    let listEl = document.getElementById("placesList");
    let bounds = new kakao.maps.LatLngBounds();

    removeAllChildNodes(listEl);
    removeMarker();

    for (let i = 0; i < data.length; i++) {
        let lat = data[i].y;
        let lng = data[i].x;
        let address_name = data[i]["address_name"];
        let place_name = data[i]["place_name"];

        const placePostion = new kakao.maps.LatLng(lat, lng);
        bounds.extend(placePostion);

        let marker = new kakao.maps.Marker({
            position: placePostion,
        });

        marker.setMap(map);
        markerList.push(marker);

        const el = document.createElement("div");
        const itemStr = `
            <div class="info">
                <div class="info_title">
                    ${place_name}
                </div>
                <span>${address_name}</span>
            </div>
        `;

        el.innerHTML = itemStr;
        el.className = "item";

        kakao.maps.event.addListener(marker, "click", function () {
            displayInfowindow(marker, place_name, address_name, lat, lng);
        });

        kakao.maps.event.addListener(map, "click", function () {
            infowindow.close();
        });

        el.onclick = function () {
            displayInfowindow(marker, place_name, address_name, lat, lng);
        };

        listEl.appendChild(el);
    }
    map.setBounds(bounds);
}

function removeAllChildNodes(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function removeMarker() {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = [];
}



//복사기 로직
let infowindowList = []; 

// 복사기 위치 데이터
var copyMachineLocations = [
    { name: "공과대학 7호관 복사기", lat: 35.178369, lng: 126.908876 },
    { name: "경영대학 1호관 복사기", lat: 35.176693, lng: 126.904134 },
    { name: "디지털 도서관 복사기", lat: 35.176778, lng: 126.905441 },
    { name: "백도 복사기", lat: 35.178115, lng: 126.906902 }
];


document.getElementById('copyMachineLocation').addEventListener('click', function(event) {
    event.preventDefault();
    showCopyMachineLocations();
});

function showCopyMachineLocations() {
    removeMarker();
    
    copyMachineLocations.forEach(location => {
        var markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        markerList.push(marker);

        var iwContent = `
        <div style="padding:10px; width:200px; font-family: Arial, sans-serif; text-align: center;">
            <h4 style="margin:0; padding-bottom:5px; border-bottom:1px solid #ccc;">${location.name}</h4>
            <p style="margin:10px 0; font-size:14px;">...</p>
            <button onclick="openPopup()" style="background-color:#0EA04F; color:white; border:none; padding:8px 8px; cursor:pointer; font-size:14px; border-radius:5px;">복사기 상세위치</button>
        </div>
    `;
    
        var infowindow = new kakao.maps.InfoWindow({
            position: markerPosition, 
            content: iwContent
        });
        infowindow.open(map, marker);
        infowindowList.push(infowindow); 
    });

    panTo();
}

// 팝업창 열기 함수
function openPopup() {
    var popup = window.open("", "Popup", "width=600,height=400,scrollbars=yes,resizable=yes");
    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>복사기 상세위치</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; }
                p { font-size: 14px; color: #666; }
            </style>
        </head>
        <body>
            <h1>복사기 상세위치</h1>
            <p>mySql 이미지 처리?..</p>
        </body>
        </html>
    `);
}

// 허공 클릭함면 마커 및 인포윈도우 제거
kakao.maps.event.addListener(map, "click", function() {
    removeMarker();
});

function removeMarker() {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = [];

    // 인포윈도우 제거
    for (let i = 0; i < infowindowList.length; i++) {
        infowindowList[i].close();
    }
    infowindowList = [];
}

function panTo() {
    var moveLatLon = new kakao.maps.LatLng(35.177519, 126.906280);  
    map.panTo(moveLatLon);       
}

