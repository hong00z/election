pragma solidity ^0.4.25;

contract Election {

    //Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }//구조체.. 응원수는 어떻게 집계할까 고민,,,

    //Store Candidate
    //Fetch Candidate
    mapping(uint => Candidate) public candidates;
    //Store Candidates Count
    uint public candidatesCount;


    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        //candidate = "Candidate 1";
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}