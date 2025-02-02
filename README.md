# Votetherum
![image](https://github.com/user-attachments/assets/d93bd6ed-a163-46c0-b2aa-d76cdb405d5d)

블록체인과 DApp을 적용한 전자 투표 시스템

## 개발 기간
2024.04.17 ~ 2024.06.13

## 개발 환경
- FE : React.js, Webpack
- Blockchain : Ganache (Local Blockchain)
- Wallet : MetaMask
- Framework : Truffle
- Smart Contract : Solidity

Github, Notion, Discord, Figma

---

## 주요 기능
- 초기화면
  
  ![image](https://github.com/user-attachments/assets/46e4ac32-d896-458c-acd9-60b664af7e43)

  화면에 처음 접속했을 때의 상태입니다. 메타마스크로 네트워크와 지갑을 연결하지 않았기때문에 로딩중인 상태를 메인화면에서 확인할 수 있습니다.
  
- 지갑 연동 과정
  
  ![image](https://github.com/user-attachments/assets/7a241a5e-4b1e-45de-afb3-c571600dfc55)
  ![image](https://github.com/user-attachments/assets/b776e0bf-22c0-42fb-8b1a-202af98fcab5)
  ![image](https://github.com/user-attachments/assets/c5862a4a-9c3b-4e45-84d0-1778acd2bec3)
  ![image](https://github.com/user-attachments/assets/e3e18ebd-adb5-439c-bc4e-3c8f5d54d7d3)

  메타마스크를 통해 가나슈로부터 가상의 이더리움을 발급받은 계정으로 로그인을 합니다. 이후 진행하고자 하는 계정으로 페이지를 해당 네트워크에 연결하면 메타마스크 창 오른쪽 상단에 페이지가 연결된 것을 확인할 수 있습니다.

- 지갑 연동 후 화면

  ![image](https://github.com/user-attachments/assets/20a08976-5e17-47ab-b99c-dab28b400289)

  메타마스크에 가나슈 이더리움 네트워크와 계정을 등록한 뒤 페이지를 연결하면 다음과 같은 화면을 확인할 수 있습니다. <br>
  선거에서의 후보자 목록과 득표수를 함께 확인할 수 있으며, 아직 투표하지 않은 상태일 경우에는 후보자를 선택하여 투표하기 버튼을 누를 수 있는 폼이 화면에 나타납니다. <br>
  화면 아래에는 현재 접속한 계정의 지갑 주소를 확인할 수 있습니다. 

- 투표 화면

  ![image](https://github.com/user-attachments/assets/45523aad-3db6-479b-a717-d19fb3f7a581)

  원하는 후보를 선택해 투표하기를 클릭하면 오른쪽 상단에 가스 비용 안내 메시지가 생성됩니다. <br>
  가스비용 컨펌 버튼을 클릭한 후 페이지를 새로고침하면 득표수에 결과가 즉시 반영되는 것을 확인할 수 있습니다. 

  ![image](https://github.com/user-attachments/assets/d9a575b7-74cc-4cef-bac6-f06f1ef24d34)

  이미 투표를 완료한 계정에 대해서는 투표 폼을 숨김처리함으로써 중복 투표를 방지할 수 있도록 구현하였습니다. <br>
  메타마스크 내 투표에 참여하지 않은 다른 계정을 연결해서 접속하면 투표 폼이 다시 나타나는 것을 확인할 수 있습니다.
