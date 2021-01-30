pragma solidity ^0.7.3;

contract TagsDirectory {
    

    struct Tag {
        uint id;
        address owner;
        address approved;
        string name;
    }

    struct TagCollection {
        string name;
        uint id;
        uint tagCount;
    }

    event OnCollectionCreation(string name, uint id);
    event OnTagAddition(string name, uint id, address account);
    event OnTagApproved(string name, uint id, address from, address to);
    event OnTagTransfer(string name, uint id, address from, address to);

    TagCollection[] public TagCollections;

    constructor() public {
        CreateCollection("Sample Collection");
    }



    mapping (uint => TagCollection) public Directory;
    mapping (string => Tag[]) public TagsListing;
    mapping (address => Tag[]) public TagsByOwner;
    // mapping (uint => Tag) public TagNumber;

    function getCollectionCount() public view returns (uint){
        return TagCollections.length;
    }

    function getCollectionTagArrayLength(string memory _name) public view returns (uint){
        return TagsListing[_name].length;
    }

    function getCollectionTagInfo(string memory _name, uint id) public view returns (uint, address, address, string memory) {
        Tag memory tag = TagsListing[_name][id-1];
        return (tag.id, tag.owner, tag.approved, tag.name);
    }

    function CreateCollection (string memory _name) public {
        uint _tagCollectionsID = TagCollections.length + 1;
        TagCollection memory collection = TagCollection(_name, _tagCollectionsID, 1);
        TagCollections.push(collection);
        Tag memory _tag = Tag( 1, msg.sender, msg.sender, _name);
        string memory _unique = _name;
        TagsListing[_unique].push(_tag);
        TagsByOwner[msg.sender].push(_tag);
        emit OnCollectionCreation(_name, _tagCollectionsID);
    }

    function AddTag (string memory _name, address _account) public {
        uint _id = TagsListing[_name].length+1;
        TagsListing[_name].push(Tag(_id, _account, _account, _name));
        emit OnTagAddition(_name, _id, _account);
    }

    function ApproveAddress (string memory _name, uint _number, address _newAccount) public {
        require(msg.sender == TagsListing[_name][_number-1].owner, "You are not the owner");
        Tag memory temp = TagsListing[_name][_number-1];
        temp.approved = _newAccount;
        TagsListing[_name][_number-1] = temp;
        emit OnTagApproved(_name, _number, msg.sender, _newAccount);
    }

    function TransferTag (string memory _name, uint _number, address _newAccount) public {
        require(msg.sender == TagsListing[_name][_number-1].approved || msg.sender == TagsListing[_name][_number-1].owner, "You are not the approved receiver or owner");
        uint length = TagsListing[_name].length;
        Tag[] memory Tags = TagsListing[_name];
        Tag memory owned;
        Tag memory received;
        for (uint i=0; i<length; i++){
            if(Tags[i].owner == msg.sender){
                owned = Tags[i];
            }
            if (Tags[i].owner == _newAccount){
                received = Tags[i];
            }
        }
        require(owned.id > 0 && received.id > 0);
        Tag memory swap1 = owned;
        Tag memory swap2 = received;
        swap1.owner = _newAccount;
        swap1.approved = _newAccount;
        swap2.owner = msg.sender;
        swap2.approved = msg.sender;
        TagsListing[_name][owned.id-1] = swap1;
        TagsListing[_name][received.id-1] = swap2;
        emit OnTagTransfer(_name, _number, msg.sender, _newAccount);

    }
}