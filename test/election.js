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

    
});
