// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is ERC20, Ownable {
uint256 public proposalcount;

constructor() ERC20("VoteToken","VTK")Ownable(msg.sender){}// to pull the onlyOwner
 mapping (uint256 => Proposal) public proposals;
event proposalapproved(
uint256 proposalid,
string description,
uint256 yesVotes,
uint256 noVotes

);

//rour test cases
struct Proposal{
uint256 id;
address proposer;
string description;
uint256 yesVotes;
uint256 noVotes;
bool isApproved;
mapping (address => bool) hasVoted;
uint256 propsercount;

}
   

//create submit propsal and add em to prop id increament proposalcpunt by 1 
  function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);}

    function submitProposal(string memory description) public {
        Proposal storage newProposal = proposals[proposalcount];
        newProposal.id = proposalcount;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.yesVotes = 0;
        newProposal.noVotes = 0;
        newProposal.propsercount = 5;

        proposalcount++;
    }

  

    function vote(uint256 proposalId, bool isYes) public {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.hasVoted[msg.sender] == false, "Already voted");
       require(proposal.id<=4, "only five voters vote");
        require(balanceOf(msg.sender) > 0, "No tokens to vote");
        proposal.hasVoted[msg.sender] = true;
        if (isYes) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
    
         if (proposalcount>=5){
          proposal.isApproved = false;
         emit proposalapproved(proposalId, proposal.description, proposal.yesVotes, proposal.noVotes);
      
      // if (proposalcount >= 5) {
          // bool  isApproved = true;
            //emit proposalapproved(proposalid,);
    }
    }
        


    


       function getProposal(
        uint256 proposalId
    )
        public
        view
        returns (
            uint256 id,
            address proposer,
            string memory description,
            uint256 yesVotes,
            uint256 noVotes
        )
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.description,
            proposal.yesVotes,
            proposal.noVotes
        );
    }

}


//emit propsalsumn(msg.sender??, ??); event propsal

//getproposal // public returns(uint id, string memory,uint25 novotes,addrees propser)
