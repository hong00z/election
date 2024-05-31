// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22;

contract Election {

    //Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        //응원수 추가하기
    }

    //Store accounts that have voted
    mapping(address => bool) public voters;
    //Store Candidates
    //Fetch Candidate
    mapping(uint => Candidate) public candidates;

    //Store Candidates Count
    uint public candidatesCount;

    //voted event
    event votedEvent (
        uint indexed _candidateId 
    );

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        //require that they haven't voted before
        require(!voters[msg.sender]); //투표한 적 없으면 true, 있으면 false를 반환해서 확인

        //require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount); //후보자 번호 범위 설정해서 확인

        //record that voter has voted
        voters[msg.sender] = true;

        //update cadidate vote Count
        candidates[_candidateId].voteCount ++;

        //전체투표율 증가

        //trigger voted event
        emit votedEvent(_candidateId);
    }
}