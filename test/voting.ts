import { expect } from "chai";
import hre from "hardhat";

describe("Votingsys", function () {
  it("Should mint and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz,Danah ,notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);
    await voting.mint(Danah.address, 100);
    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(Danah).submitProposal("Proposal 3");



    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(Danah).vote(2, false);
    

    


    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(2);



    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
    expect(proposal3.yesVotes).to.equal(0);
    expect(proposal3.noVotes).to.equal(1);
 

  


  });
  it("should vote people with tokens only",async function(){
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz,Danah ,notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);
    await voting.mint(Danah.address, 100);// when changed to zero error will show "No tokens to vote"
    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(Danah).submitProposal("Proposal 3");



    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(Danah).vote(2, false);
    

    



 

  });

  it("should only five proposer vote",async function(){
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz,Danah, Brian,Louis,Rahaf,notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);
    await voting.mint(Danah.address, 100);
    await voting.mint(Brian.address, 100);
    await voting.mint(Louis.address, 100);
    await voting.mint(Rahaf.address, 100);



    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(Danah).submitProposal("Proposal 3");
    await voting.connect(Brian).submitProposal("Proposal 4");
    await voting.connect(Louis).submitProposal("Proposal 5");


    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(Danah).vote(2, false);
    await voting.connect(Brian).vote(3, false);
    await voting.connect(Louis).vote(4, false); 
   //await voting.connect(Rahaf).vote(5, false); //will get result of an error "only five voters vote"


    


   



   
 
 

  });
  it("already voted",async function(){
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz,Danah, Brian,Louis,Rahaf,notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);
    await voting.mint(Danah.address, 100);
  



    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(Danah).submitProposal("Proposal 3");
  


    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(Danah).vote(2, false);
    //await voting.connect(Aziz).vote(1,false );   // will show error "already voted!!"
  


    


   



   
 
 

  });
});