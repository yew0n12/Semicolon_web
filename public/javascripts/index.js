function searchPlaces() {
    let keyword = $("#keyword").val(); // 사용자가 입력한 키워드.

    // 검색된 결과를 queryString으로 전달하여 map.ejs로 이동
    window.location.href = "/map?keyword=" + keyword;
}
