var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    var electionInstance; //후보 정보 확인 시 필요한 변수 선언 (전역변수)

    //후보 수 확인
    it("initializes with two candidates", function() {          //코드 설명
        return Election.deployed().then(function(instance) {      //fetch an instance of our deployed contract
            return instance.candidatesCount();                  //fecth our candidatesCount(비동기적)
        }).then(function(count) {                               //inject the value of count(promise chain, 콜백 함수 사용)
            assert.equal(count, 2);                             //count와 2 값을 비교
        });
    });

    //후보 정보 확인
    it("it initializes the candidates with the correct values", function() {    //코드 설명, 함수 전달
        return Election.deployed().then(function(instance) {                    //copy of deployed contract 반환
            electionInstance = instance;                                        //변수 할당 (전역변수 사용 이유: promise chain에서 변수 접근하려고)
            return electionInstance.candidates(1);                              //첫번째 후보 불러오기
        }).then(function(candidate){                                            
            assert.equal(candidate[0], 1, "contains the correct id");           //후보 정보 같은지 확인
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);                              //두번째 후보 불러오기
        }).then(function(candidate){                                            
            assert.equal(candidate[0], 2, "contains the correct id");           //후보 정보 같은지 확인
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });

    //vote function 확인
    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {    //copy of deployed contract 반환
          electionInstance = instance;
          candidateId = 1;                                      //candidateId 선언
          return electionInstance.vote(candidateId, { from: accounts[0] }); //선택한 후보 번호, 유권자 계정 정보를 전달
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");                                         //한 줄 이상의 로그가 발생했는지 확인
          assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");                         //로그의 event가 votedEvent인지 확인
          assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct"); //event arg에 후보자 번호를 갖고있는지 확인 
          return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "the voter was marked as voted");
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {  
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
      });


      //vote function 두번째 requirement 확인
      it("throws an exception for invalid candiates", function() {      //유효한 후보자인지 확인
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })       //1번 유권자 계정으로 99번 후보자에게 투표 시도
        }).then(assert.fail).catch(function(error) {                    //에러 메세지 revert 문구 확인
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {                                  //컨트랙트가 수정되지 않았는지 확인(첫번째 후보자 투표수 확인)
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {                                  //컨트랙트가 수정되지 않았는지 확인(두번째 후보자 투표수 확인)
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });
      
      //vote function 첫번째 requirement 확인
      it("throws an exception for double voting", function() {          //중복 투표 확인
        return Election.deployed().then(async function(instance) {
          electionInstance = instance;
          candidateId = 2;
          await electionInstance.vote(candidateId, { from: accounts[1] });    //1번 유권자 계정으로 2번 후보자에게 투표 시도
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "accepts first vote");             //중복이 아니라서 성공
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] }); //1번 유권자 계정으로 2번 후보자에게 중복 투표 시도
        }).then(assert.fail).catch(function(error) {                    //에러 메세지 revert 문구 확인
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {                                  //컨트랙트가 수정되지 않았는지 확인(첫번째 후보자 투표수 확인)
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {                                  //컨트랙트가 수정되지 않았는지 확인(두번째 후보자 투표수 확인)
          var voteCount = candidate2[2];
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });
});