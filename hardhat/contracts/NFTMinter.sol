// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract NFTMinter is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Royalty {
    // set mint price
    uint256 public constant mintPrice = 0;
    // define royalty info and mappings
    RoyaltyInfo private _defaultRoyaltyInfo;
    mapping(uint256 => RoyaltyInfo) private _tokenRoyaltyInfo;

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
        {
            super._beforeTokenTransfer(from, to, tokenId);
        }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
        {
            return super.tokenURI(tokenId);
        }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721Royalty)
        returns (bool)
        {
            return super.supportsInterface(interfaceId);
        }

    constructor() ERC721("CryptoEscondido", "CPE") {}

    function _feeDenominator() internal pure virtual override returns (uint96) {
        return 10000;
    }

    function _setDefaultRoyalty(address receiver, uint96 feeNumerator) internal virtual override {
        require(feeNumerator <= _feeDenominator(), "ERC2981: royalty fee will exceed salePrice");
        require(receiver != address(0), "ERC2981: invalid receiver");

        _defaultRoyaltyInfo = RoyaltyInfo(receiver, feeNumerator);
    }

    function mint(string memory _uri) public payable {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, _uri);
        _setDefaultRoyalty(msg.sender, 80);
    }


}