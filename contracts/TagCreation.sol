pragma solidity ^0.7.3;

contract TagsDirectory {
    

    struct Tag {
        uint id;
        address owner;
    }

    struct TagCollection {
        string name;
        uint id;
        uint tagCount;
    }

    event OnCollectionCreation(string name, uint id);

    TagCollection[] public TagCollections;

    constructor() public {
        CreateCollection("Sample Collection");
    }



    mapping (uint => TagCollection) public Directory;
    mapping (string => Tag[]) public TagsListing;
    // mapping (uint => Tag) public TagNumber;

    function getCollectionCount() public view returns (uint){
        return TagCollections.length;
    }

    function CreateCollection (string memory _name) public {
        uint _tagCollectionsID = TagCollections.length + 1;
        TagCollection memory collection = TagCollection(_name, _tagCollectionsID, 1);
        TagCollections.push(collection);
        Tag memory _tag = Tag( 1, msg.sender );
        string memory _unique = _name;
        TagsListing[_unique].push(_tag);
        emit OnCollectionCreation(_name, _tagCollectionsID);
    }
}