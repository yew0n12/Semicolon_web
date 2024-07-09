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

    let popupWidth = 600;
    let popupHeight = 800;

    let left = (screenWidth - popupWidth) / 2;
    let top = (screenHeight - popupHeight) / 2;

    let popup = window.open("", "_blank", "width=600,height=800,left=" + left + ",top=" + top);

    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${place_name}</title>
            <style>
                #map { width: 100%; height: 90%; }
                #buttons { text-align: center; padding: 10px; }
                .floor-button { margin: 0 5px; padding: 5px 10px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <div id="buttons"></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.1/axios.min.js" integrity="sha512-w9PRLSWbo+Yqin/AzSMGoP+qe8UF1njFtd1rEnR58Xv2GEJNEa6O6Bv53mkPbNyAwGCn1HVt1OOvd5i+E55t+w==" crossorigin="anonymous" referrerPolicy="no-referrer"></script>
            <script>
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
                    document.getElementById("map").innerHTML = '<img src="' + imagePathRelative + '" alt="Map Image" style="width: 100%; height: auto;">';
                }

                function createFloorButtons(images) {
                    const buttonsContainer = document.getElementById('buttons');
                    buttonsContainer.innerHTML = '';
                    images.forEach(image => {
                        const button = document.createElement('button');
                        button.className = 'floor-button';
                        button.innerText = "Floor " + image.floor;
                        button.onclick = () => showImage(image.image_path);
                        buttonsContainer.appendChild(button);
                    });
                }

                async function init() {
                    const placeName = "${place_name}";
                    const images = await getImages(placeName);

                    if (images.length > 0) {
                        createFloorButtons(images);
                        showImage(images[0].image_path); // 기본적으로 첫 번째 층 이미지 표시
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
