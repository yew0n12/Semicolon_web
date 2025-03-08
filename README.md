# 배포 중단 알림
- 2024.10.20 AWS 프리티어 지원 종료로 인해 배포가 종료되었습니다. 

# :pushpin: Semicolon; 
<p>전남대학교 인공지능학부 과동아리 세미콜론 팀 프로젝트에서 개발한 전남대학교 실내지도 확인 사이트 입니다.</p>

# 📖 목차 
 - [개요](#개요) 
 - [개발 환경](#개발-환경)
 - [사용 기술](#사용-기술)
 - [아키텍쳐](#인프라구조) 
 - [E-R 다이어그램](#e-r-다이어그램)
 - [프로젝트 목적](#프로젝트-목적)
 - [화면 구성](#화면-구성)
 -  [기술적 선택](#기술적-선택)
 -  [주요 기능](#주요-기능)




## 📃개요
**전남대학교 실내지도**는 학교 학생들이 찾고자하는 건물과 강의실의 실내지도 정보를 제공하는 웹 에플리케이션 입니다.<br> 

## 개발 환경

![GitHub](https://img.shields.io/badge/github-606060?style=flat&logo=github) 
![VSCode](https://img.shields.io/badge/vscode-blue?style=flat&logo=VisualStudioCode) 
![Windows 11](https://img.shields.io/badge/windows%2011-0078D6?style=flat&logo=windows)

- Windows 11
- Visual Studio Code
- GitHub

## 사용 기술

![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=nodedotjs)  ![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express)  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5)  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3)  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript)  
![MySQL](https://img.shields.io/badge/MySQL-8.0.28-4479A1?style=flat&logo=mysql)  
![AWS EC2](https://img.shields.io/badge/AWS%20EC2-FF9900?style=flat&logo=amazonec2)  ![AWS S3](https://img.shields.io/badge/AWS%20S3-FF9900?style=flat&logo=amazons3)  
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=githubactions)

**백엔드**
- Node.js
- Express.js

**프론트엔드**
- HTML5/CSS3
- JavaScript

**데이터베이스**
- MySQL

**인프라**
- AWS EC2
- AWS S3


**라이브러리**
- [KakaoMaps API](https://apis.map.kakao.com/)

## 인프라구조
![인프라구조](https://github.com/yew0n12/Semicolon_web/blob/realMain/public/images/jnu.drawio.png)

## E-R 다이어그램
![ERD](https://github.com/yew0n12/Semicolon_web/blob/realMain/public/images/jnuMapERD.png)


## 프로젝트 목적
학교 내 실내 지도와 편의시설 정보를 제공하는 웹 애플리케이션을 제작하여, 학생, 교직원, 방문자가 학교 내 주요 시설(복사기, 편의점, 주차장 등)을 쉽게 찾을 수 있도록 지원합니다. 로그인 없이 접근 가능한 직관적인 인터페이스를 통해 누구나 빠르게 원하는 정보를 얻고, KakaoMaps API를 활용한 실내 지도 시각화로 효율적인 정보 제공을 돕는 것을 목표로 합니다.


## 기술적 선택

### 데이터베이스: MySQL
- **관계형 데이터 관리**: 건물, 층, 시설 간 명확한 관계(1:N, N:1)를 정의해야 하므로, MySQL의 관계형 데이터베이스 구조가 적합했습니다. 예를 들어, 건물과 층, 층과 시설 간의 계층적 데이터를 조인으로 효율적으로 조회 가능합니다.
- **MySQL vs MongoDB**: MongoDB는 비정형 데이터와 스케일링에 강점이 있지만, 이번 프로젝트는 정형화된 테이블 구조(예: Building, Floor, Facility)와 일관된 쿼리 패턴을 요구했기 때문에 MySQL을 선택했습니다. 또한, 개발자가 MySQL에 익숙해 빠르게 설계 및 관리할 수 있었습니다.
- **오픈소스**: 무료로 사용 가능하며, MySQL Workbench로 ERD 설계와 관리가 용이.

### 라이브러리: KakaoMaps API
- **실내 지도 구현**: KakaoMaps API는 한국 내 실내 지도 데이터를 효과적으로 시각화하며, 좌표 기반으로 복사기, 편의점, 주차장 등의 시설을 마커로 표시하는 데 적합합니다.
- **무료 사용**: 초기 개발 단계에서 비용 효율성을 위해 무료 사용 범위가 넓은 KakaoMaps를 선택했습니다.
- **국내 최적화**: 한국 학교 환경에 최적화된 지도 데이터와 좌표 체계를 제공해 정확한 실내 지도 구현이 가능했습니다.

### 추가 고려: 로그인 없는 설계
- **단순화**: 사용자 인증 기술 배제, 데이터 조회 중심으로 설계.
- **정적 데이터**: 자주 변경되지 않는 데이터로 캐싱 기술 제외.


## 화면 구성 💻
![홈페이지](https://github.com/user-attachments/assets/ff725a69-7c54-4dad-a3ee-5dafec2f561e)
![map ](https://github.com/user-attachments/assets/25d3e779-8217-4464-a134-b60a92daa542)
![편의시설](https://github.com/user-attachments/assets/54cb5ebe-2a84-4744-9aa3-d1cfadfcf372)
![지도](https://github.com/user-attachments/assets/8de9398a-5b0b-44e5-b275-3a20045d8431)




## 주요 기능
<ul>
	<li>전남대학교 광주캠퍼스 지도, 실내지도 확인</li>
	<li>층 별로 내부 구조를 확인 할 수 있도록 설정</li>
	<li>건물 내의 편의시설 위치 정보 제공</li>
	<li>복사기 위치, 편의점, 주차장 위치 확인</li>
</ul>
	
## :clipboard: Project Member
<table width="800">
<thead>
<tr>
<th width="100" align="center">이름</th>
<th width="250" align="center">역할</th>
<th width="150" align="center">Github 계정</th>
</tr> 
</thead>

<tbody>
<tr>
<td width="100" align="center">나예원</td>
<td width="250" align="center">기획, BE </td>
<td width="150" align="center">
  <a href="https://github.com/yew0n12" target="_blank"><img src="https://img.shields.io/badge/yew0n12-655ced?style=social&logo=github"></a></td>
</tr>
	
<tr>
<td width="100" align="center">최재원</td>
<td width="250" align="center">FE</td>
<td width="150" align="center">	
	<a href="https://github.com/ppre1ude" target="_blank"><img src="https://img.shields.io/badge/ppre1ude-655ced?style=social&logo=github"></a></td>
</td>
</tr>

<tr>
<td width="100" align="center">박현민</td>
<td width="250" align="center">BE</td>
<td width="150" align="center">	
	<a href="" target="https://github.com/hyunminee"><img src="https://img.shields.io/badge/hyunminee-655ced?style=social&logo=github"></a></td>
</td>
</tr>
	
<tr>
<td width="100" align="center">차희준</td>
<td width="250" align="center">FE</td>
<td width="150" align="center">	
	<a href="https://github.com/mono009" target="_blank"><img src="https://img.shields.io/badge/mono009-655ced?style=social&logo=github"/></a>
</td>
</tr>

<tr>
<td width="100" align="center">채민식</td>
<td width="250" align="center">BE, FE</td>
<td width="150" align="center">	
	<a href="https://github.com/wrd1stProgrammer" target="_blank"><img src="https://img.shields.io/badge/minsik-655ced?style=social&logo=github"/></a>
</td>
</tr>
</tbody>
</table>






