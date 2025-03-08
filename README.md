# 배포 중단 알림
- 2024.10.20 AWS 프리티어 지원 종료로 인해 배포가 종료되었습니다. 

# :pushpin: Semicolon; 
<p>전남대학교 인공지능학부 과동아리 세미콜론 팀 프로젝트에서 개발한 전남대학교 실내지도 확인 사이트 입니다.</p>

# 📖 목차 
 - [개요](#개요) 
 - [개발 환경](#개발-환경)
 - [사용 기술](#사용-기술)
 - [아키텍처](#시스템-아키텍처) 
 - [E-R 다이어그램](#e-r-다이어그램)
 - [프로젝트 목적](#프로젝트-목적)
 - [화면 구성](#화면-구성)
 -  [핵심 기능](#핵심-기능)
    - [에러 처리](#에러처리)

 - [CI/CD](#cicd)
    - [무중단 배포](#무중단-배포)


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
![인프라구조](https://drive.google.com/file/d/1GoL2FBCNljpnODXLMHgKCYkA_rLqg71S/view?usp=drive_link](https://github.com/yew0n12/Semicolon_web/blob/realMain/public/images/jnu.drawio.png)



## 화면 구성 💻
![홈페이지](https://github.com/user-attachments/assets/ff725a69-7c54-4dad-a3ee-5dafec2f561e)
![map ](https://github.com/user-attachments/assets/25d3e779-8217-4464-a134-b60a92daa542)
![편의시설](https://github.com/user-attachments/assets/54cb5ebe-2a84-4744-9aa3-d1cfadfcf372)
![지도](https://github.com/user-attachments/assets/8de9398a-5b0b-44e5-b275-3a20045d8431)


## :bulb: 주요 기능
<ul>
	<li>전남대학교 광주캠퍼스 지도 확인</li>
	<li>층 별로 내부 구조를 확인 할 수 있도록 설정</li>
	<li>복사기 위치, 편의점 위치 확인</li>
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
	<a href="https://github.com/minsik" target="_blank"><img src="https://img.shields.io/badge/minsik-655ced?style=social&logo=github"/></a>
</td>
</tr>
</tbody>
</table>

## 📚 STACKS
<p>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
</p>
<p>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
</p>
<p>
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</p>







