// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    event VoteCasted(address voter, string candidate);

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted");

        votes[candidate]++;
        hasVoted[msg.sender] = true;

        emit VoteCasted(msg.sender, candidate);
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}