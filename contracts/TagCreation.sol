pragma solidity ^0.7.3;

contract TagsDirectory {
    uint public tagsCollectionsCount = 0;

    struct Tag {
        uint id;
        address owner;
    }

    struct TagCollection {
        string name;
        uint id;
        Tag[] tags;
        uint tagCount;
    }

    constructor() public {
        AddCollection("Sample Collection");
    }



    mapping (uint => TagCollection) public Directory;
    mapping (uint => Tag) public TagNumber;

    function getCollectionCount() public view returns (uint){
        return tagsCollectionsCount;
    }

    function AddCollection (string memory _name) public {
        tagsCollectionsCount++;
        Directory[tagsCollectionsCount] = TagCollection(_name, tagsCollectionsCount, storage Tags[], 1);
        TagCollection memory collection = Directory[tagsCollectionsCount];
        uint count = collection.tags.length;
        collection.tags.push(Tag(count++, msg.sender));
        Directory[tagsCollectionsCount] = collection;
    }
}