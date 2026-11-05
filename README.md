# EHNY Games 공식 홈페이지

빌드나 설치 없이 배포할 수 있는 한·영 정적 사이트입니다. 한국어가 기본이며 영어는 /en/에서 열립니다.

## 공개 전 준비

- 지원 페이지의 두 언어에 실제 수신 가능한 문의처를 넣으세요.
- 출시용 AAB의 Unity 진단·크래시·하드웨어 통계, 실제 네트워크 통신, SDK와 권한, Android 백업·복원 및 기기 간 전송을 확인하세요.
- 확인 결과와 시행일, 문의처를 한·영 정책에 반영하세요. 최종 문서로 바꿀 때 두 페이지의 noindex 표시를 검토하세요. Play Console에는 최종 정책 URL을 제출하세요.
- 게임 이미지와 회사 로고는 제공받은 두 ZIP에서 가져왔습니다. 이용 방식은 게임 소개 자료에 따라 예정 사항으로 표기했습니다.

## GitHub Pages 배포

1. GitHub의 gbbc82/ehnygames-website 공개 저장소를 엽니다. 저장소가 없다면 해당 이름으로 생성합니다. 기존 파일이 있으면 변경 내용을 검토해 병합합니다.
2. 이 폴더 **안의 내용**을 main 브랜치 루트에 올립니다. index.html, assets/, en/, support/, privacy/, CNAME, .nojekyll이 루트에 있어야 합니다.
3. Settings → Pages에서 Deploy from a branch → main → /(root)를 선택하고 저장합니다.
4. GitHub 계정의 Pages 설정에서 도메인 소유권을 확인한 뒤, 저장소의 Pages → Custom domain에 ehnygames.com을 지정합니다.
5. DNS 관리에서 루트 호스트 @에 GitHub Pages A 레코드 네 개를 등록합니다. 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. www도 사용하려면 www CNAME을 gbbc82.github.io로 설정합니다.
6. DNS 적용 후 Settings → Pages에서 Enforce HTTPS를 켭니다. 홈페이지, /en/, /support/, /privacy/bolbolland/를 직접 열고 언어 전환과 이미지가 로드되는지 확인합니다.

[GitHub Pages 공식 도메인 설정 안내](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
