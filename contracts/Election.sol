pragma solidity >=0.4.22;

contract Election {

    //Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        //응원수 추가하기
    }

    //Store Candidates
    //Fetch Candidate
    mapping(uint => Candidate) public candidates;

    //Store Candidates Count
    uint public candidatesCount;


    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}