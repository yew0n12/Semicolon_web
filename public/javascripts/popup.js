function displayInfowindow(marker, place_name, address_name, lat, lng) {
    let content = `
        <div class="infowindow-content">
            <div class="place-name">${place_name}</div>
            <div class="address">${address_name}</div>
            <button class="map-button" id="showIndoorButton">지도보기</button> 
        </div> 
    `;
    map.panTo(marker.getPosition());
    map.setLevel(2, { animate: { duration: 400 } }); // 클릭시 검색된 마커로 지도 이동
    infowindow.setContent(content);
    infowindow.open(map, marker);

    // "지도보기" 버튼에 클릭 이벤트 리스너 추가
    var showIndoorButton = document.getElementById('showIndoorButton');
    showIndoorButton.addEventListener('click', function() {
        // 실내지도 보기 함수 호출
        showIndoorMap(place_name);
    });
}

function showIndoorMap(place_name) {
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;

    let popupWidth = 1000;
    let popupHeight = 500;

    let left = (screenWidth - popupWidth) / 2;
    let top = (screenHeight - popupHeight) / 2;

    let popup = window.open("", "_blank", `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);

    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${place_name}</title>
            <style>
                body { 
                    display: flex; 
                    flex-direction: row; 
                    align-items: flex-start; 
                    justify-content: center; 
                    margin: 0; 
                    padding: 0;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                    box-sizing: border-box;
                }
                #controls { 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center;
                    justify-content: flex-start;
                    position: absolute;
                    top: 20px;
                    left: 20px;
                }
                #currentFloor {
                    font-size: 40px; 
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .arrow-button { 
                    margin: 5px 0; 
                    padding: 5px 10px; 
                    cursor: pointer; 
                    background-color: gray;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 20px;
                }
                .arrow-button:hover {
                    background-color: darkgray;
                }
                #map { 
                    width: 70%; 
                    height: 70%; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            </style>
        </head>
        <body>
            <div id="controls">
                <div id="currentFloor">1층</div>
                <button class="arrow-button" id="floorUpButton">▲</button>
                <button class="arrow-button" id="floorDownButton">▼</button>
            </div>
            <div id="map"></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.1/axios.min.js" integrity="sha512-w9PRLSWbo+Yqin/AzSMGoP+qe8UF1njFtd1rEnR58Xv2GEJNEa6O6Bv53mkPbNyAwGCn1HVt1OOvd5i+E55t+w==" crossorigin="anonymous" referrerPolicy="no-referrer"></script>
            <script>
                let currentFloor = 1;
                let images = [];

                async function getImages(placeName) {
                    try {
                        const response = await axios.get('/images', { params: { placeName } });
                        return response.data.result;
                    } catch (error) {
                        console.error('Error fetching images:', error);
                        return [];
                    }
                }

                function showImage(imagePath) {
                    const imagePathRelative = imagePath.replace('/home/ubuntu/image/', '/images/');
                    document.getElementById("map").innerHTML = '<img src="' + imagePathRelative + '" alt="Map Image" style="max-width: 100%; max-height: 100%;">';
                }

                function updateFloor() {
                    document.getElementById('currentFloor').innerText = currentFloor + "F";
                    const image = images.find(img => img.floor == currentFloor);
                    if (image) {
                        showImage(image.image_path);
                    } else {
                        alert('해당 층의 이미지가 없습니다.');
                    }
                }

                document.getElementById('floorUpButton').addEventListener('click', function() {
                    if (currentFloor < images.length) {
                        currentFloor++;
                        updateFloor();
                    } else {
                        alert('더 높은 층이 없습니다.');
                    }
                });

                document.getElementById('floorDownButton').addEventListener('click', function() {
                    if (currentFloor > 1) {
                        currentFloor--;
                        updateFloor();
                    } else {
                        alert('더 낮은 층이 없습니다.');
                    }
                });

                async function init() {
                    const placeName = "${place_name}";
                    images = await getImages(placeName);

                    if (images.length > 0) {
                        updateFloor();
                    } else {
                        document.getElementById("map").innerText = "No images available.";
                    }
                }

                init();
            </script>
        </body>
        </html>
    `);
}
