// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfBuildNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct BuildData {
        string title;
        string description;
        string githubURL;
        string imageURL;
    }

    constructor() ERC721("ProofOfBuildNFT", "POB") {
        tokenCounter = 0;
    }

    function mintBuildNFT(
        string memory _title,
        string memory _description,
        string memory _githubURL,
        string memory _imageURL
    ) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);

        string memory json = string(abi.encodePacked(
            '{"name": "', _title,
            '", "description": "', _description,
            '", "image": "', _imageURL,
            '", "external_url": "', _githubURL,
            '"}'
        ));

        string memory encodedMetadata = string(abi.encodePacked(
            "data:application/json;base64,",
            base64(bytes(json))
        ));

        _setTokenURI(tokenId, encodedMetadata);
        tokenCounter++;
    }

    /// @notice Encode bytes to base64
    function base64(bytes memory data) internal pure returns (string memory) {
        string memory TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        string memory result = new string(4 * ((data.length + 2) / 3));
        bytes memory tableBytes = bytes(TABLE);
        bytes memory resultBytes = bytes(result);

        uint256 i = 0;
        uint256 j = 0;

        for (; i + 3 <= data.length; i += 3) {
            (resultBytes[j], resultBytes[j+1], resultBytes[j+2], resultBytes[j+3]) = encode3(
                uint8(data[i]), uint8(data[i+1]), uint8(data[i+2]), tableBytes
            );
            j += 4;
        }

        if (i + 2 == data.length) {
            (resultBytes[j], resultBytes[j+1], resultBytes[j+2], resultBytes[j+3]) = encode2(
                uint8(data[i]), uint8(data[i+1]), tableBytes
            );
        } else if (i + 1 == data.length) {
            (resultBytes[j], resultBytes[j+1], resultBytes[j+2], resultBytes[j+3]) = encode1(
                uint8(data[i]), tableBytes
            );
        }

        return string(resultBytes);
    }

    function encode3(uint256 a, uint256 b, uint256 c, bytes memory table) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            table[(a >> 2) & 0x3F],
            table[((a & 0x03) << 4) | (b >> 4)],
            table[((b & 0x0F) << 2) | (c >> 6)],
            table[c & 0x3F]
        );
    }

    function encode2(uint256 a, uint256 b, bytes memory table) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            table[(a >> 2) & 0x3F],
            table[((a & 0x03) << 4) | (b >> 4)],
            table[(b & 0x0F) << 2],
            "="
        );
    }

    function encode1(uint256 a, bytes memory table) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            table[(a >> 2) & 0x3F],
            table[(a & 0x03) << 4],
            "=",
            "="
        );
    }
}
