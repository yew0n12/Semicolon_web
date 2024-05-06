const mapContainer = document.getElementById("map");
const mapOption = {
    center: new kakao.maps.LatLng(35.176537, 126.905384),
    level:4,
};

let map = new kakao.maps.Map(mapContainer,mapOption);

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
        new kakao.maps.LatLng(35.178440,126.905300),
        new kakao.maps.LatLng(35.181214,126.904628),
        new kakao.maps.LatLng(35.181946,126.909889),
        new kakao.maps.LatLng(35.177751,126,912076),
        new kakao.maps.LatLng(35.174035,126,912535),
        new kakao.maps.LatLng(35.171951,126,898567),
        new kakao.maps.LatLng(35.176691,126,899143)
    ];
    // 다각형 영역을 포함하는 경계 상자 생성
    const bounds = new kakao.maps.LatLngBounds();

    // 다각형 좌표를 경계 상자에 추가
    for (let i = 0; i < jnuCoords.length; i++) {
        bounds.extend(jnuCoords[i]);
    }

    // 검색 옵션 설정
    const options = {
        bounds: bounds
    };

    // "공" 또는 "경"과 숫자가 포함되어 있는지 확인
    let regex = /(공|경)(\d+)/; // 정규 표현식임.
    let match = keyword.match(regex);

    if (match) {
        let buildingName = match[1]; // 건물명 추출 (공 또는 경)
        let buildingNumber = match[2]; // 숫자 추출 (1호관이면 1)
        let buildingFullName = ""; // 건물 전체 이름 초기화

        // 건물명에 따라 건물 전체 이름 설정
        if (buildingName === "공") {
            buildingFullName = "공과대학 " + buildingNumber + "호관";
        } else if (buildingName === "경") {
            buildingFullName = "경영대학 " + buildingNumber + "호관";
        }

        // 에타 키워드 검색
        ps.keywordSearch(buildingFullName, placesSearchDB,options);
    } else {
        // 원래대로 검색
        ps.keywordSearch(keyword, placesSearchDB,options);
    }

    // ps.keywordSearch(keyword, placesSearchDB,options);
}

function placesSearchDB(data,status) {
    if (status === kakao.maps.services.Status.OK) {
        // 건물 키워드에 해당하는 결과 필터링
        // let filteredData = filterPlacesByKeyword(data); //필터 키워드 검색 변수 skip
        // 필터링된 결과를 표시
        displayPlaces(data);
    } else if(status === kakao.maps.services.Status.ZERO_RESULT){
        alert("올바른 키워드로 검색하세요!!");
        return;
    } else if(status === kakao.maps.services.Status.ERROR0) {
        alert("검색 결과중 오류 발생");
        return;
    }
}
//--

/*
function filterPlacesByKeyword(data) {
    // 건물 키워드 목록
    let buildingKeywords = ["공과대학", "공1", "공2", "공3", "공4", "공5", "공6"]; // 예시
    // 필터링된 결과를 담을 배열
    let filteredData = [];
    // 각 장소에 대해 건물 키워드가 포함되어 있는지 확인하고 필터링
    for (let i = 0; i < data.length; i++) {
        let placeName = data[i].place_name;
        for (let j = 0; j < buildingKeywords.length; j++) {
            if (placeName.includes(buildingKeywords[j])) {
                filteredData.push(data[i]);
                break;
            }
        }
    }
    return filteredData;
}
*/
// 필터 키워드 검색 함수 오류로 skip


//--
function displayPlaces(data) {
    let listEl = document.getElementById("placesList");
    let bounds = new kakao.maps.LatLngBounds();

    removeAllChildNodes(listEl);
    removeMarker();

    for (let i =0;i<data.length;i++) {
        let lat = data[i].y;
        let lng = data[i].x;
        let address_name = data[i]["address_name"];
        let place_name = data[i]["place_name"];

        const placePostion = new kakao.maps.LatLng(lat,lng);
        bounds.extend(placePostion);

        let marker = new kakao.maps.Marker({
            position: placePostion,
        });

        marker.setMap(map);
        markerList.push(marker);

        const el = document.createElement("div");
        const itemStr = `
            <div class = "info">
                <div class = "info_title">
                    ${place_name}
                </div>
                <span>${address_name}</span>
            </div>
        `;

        el.innerHTML = itemStr;
        el.className = "item";

        kakao.maps.event.addListener(marker,"click",function() {
            displayInfowindow(marker, place_name,address_name,lat,lng);
        });

        kakao.maps.event.addListener(map,"click",function() {
            infowindow.close();
        });

        el.onclick = function() {
            displayInfowindow(marker, place_name,address_name,lat,lng);
            // map.setLevel(30, { animate: { duration: 500 } });
        };

        listEl.appendChild(el);
    }
    map.setBounds(bounds);
}

function displayInfowindow(marker,place_name,address_name,lat,lng){
    let content = `
    <div style ="padding:25px;">
        ${place_name}<br>
        ${address_name}<br>
        <button onClick="showIndoorMap('${place_name}','${address_name}',${lat},${lng});">지도보기</button>
    </div> 
    `;
    map.panTo(marker.getPosition());
    map.setLevel(2, { animate: { duration: 400 } }); // 클릭시 검색된 마커로 지도 이동
    infowindow.setContent(content);
    infowindow.open(map,marker);
}

function showIndoorMap(place_name, address_name, lat, lng) {
    // 새로운 팝업 창을 열기
    let popup = window.open("", "_blank", "width=600,height=400");

    // 팝업 창에 실내지도 보여주기
    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>실내지도</title>
            <style>
                #map { width: 100%; height: 100%; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                // 카카오 지도 API를 사용하여 지도 표시
                var mapContainer = document.getElementById("map");
                var mapOption = {
                    center: new kakao.maps.LatLng(${lat}, ${lng}),
                    level: 2
                };
                var map = new kakao.maps.Map(mapContainer, mapOption);
            </script>
        </body>
        </html>
    `);

    // 팝업 창 제목 설정
    popup.document.title = place_name;
}

function removeAllChildNodes(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function removeMarker() {
    for (let i=0;i<markerList.length;i++) {
        markerList[i].setMap(null);
    }
    markerList = [];
}

