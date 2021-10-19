// SPDX-License-Identifier: MIT
// A generative NFT for tech stacks.

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Base64.sol";

contract TechStack is ERC721Enumerable, ReentrancyGuard, Ownable {
    // This struct is in the order that it is presented in the token:

    struct Stack {
        string cloud;
        string backend;
        string database;
        string transport;
        string frontend;
        string ui;
        string state;
    }

    string[] private clouds = [
        "AWS",
        "Azure",
        "Google Cloud Platform",
        "DigitalOcean",
        "GoDaddy",
        "Linode",
        "IBM Cloud",
        "Alibaba Cloud",
        "Raspberry Pi in your office",
        "Server in your garage"
    ];

    string[] private backends = [
        "Node.js",
        "Express",
        "Go",
        "Rust",
        "PHP",
        "Laravel",
        "Python",
        "Django",
        "Java",
        "C#",
        ".NET",
        "Ruby",
        "Ruby on Rails",
        "Some JVM language you've never heard of"
    ];

    string[] private databases = [
        "PostgreSQL",
        "MySQL",
        "MariaDB",
        "MongoDB",
        "Redis",
        "In-memory",
        "SQLite",
        "Firebase",
        "Some NoSQL database you've never heard of",
        "Google Spreadsheet",
        "Microsoft SQL Server Enterprise"
    ];

    string[] private transports = [
        "GraphQL",
        "REST",
        "GRPC",
        "Falcor",
        "JSON-RPC",
        "SOAP",
        "SQL strings over HTTP",
        "Unencrypted HTTP requests"
    ];

    string[] private frontendLangs = [
        "TypeScript",
        "TypeScript",
        "TypeScript",
        "TypeScript",
        "JavaScript",
        "JavaScript",
        "JavaScript",
        "JavaScript",
        "CoffeeScript",
        "Rust compiled to WASM"
    ];

    string[] private uiLibraries = [
        "Next.js",
        "React",
        "Vue",
        "Svelte",
        "Ember.js",
        "jQuery",
        "Angular",
        "AngularJS 1.2.32",
        "Vanilla DOM",
        "HTML",
        "WebComponents"
    ];

    string[] private states = [
        "Backbone.js",
        "Apollo",
        "Relay",
        "urql",
        "React Query",
        "Redux",
        "Flux",
        "MobX",
        "XState"
    ];

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function getCloud(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "CLOUD", clouds);
    }

    function getBackend(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "BACKEND", backends);
    }

    function getDatabase(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "DATABASE", databases);
    }

    function getTransport(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TRANSPORT", transports);
    }

    function getFrontend(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "FRONTEND", frontendLangs);
    }

    function getUI(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "UI", uiLibraries);
    }

    function getState(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "STATE", states);
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, toString(tokenId)))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }

    function itemNames(uint256 tokenId) public view returns (Stack memory) {
        return
            Stack({
                cloud: getCloud(tokenId),
                backend: getBackend(tokenId),
                database: getDatabase(tokenId),
                transport: getTransport(tokenId),
                frontend: getFrontend(tokenId),
                ui: getUI(tokenId),
                state: getState(tokenId)
            });
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        string[17] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-weight: bold; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="50%" y="90" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[1] = getCloud(tokenId);

        parts[
            2
        ] = '</text><text x="50%" y="120" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[3] = getBackend(tokenId);

        parts[
            4
        ] = '</text><text x="50%" y="150" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[5] = getDatabase(tokenId);

        parts[
            6
        ] = '</text><text x="50%" y="180" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[7] = getTransport(tokenId);

        parts[
            8
        ] = '</text><text x="50%" y="210" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[9] = getFrontend(tokenId);

        parts[
            10
        ] = '</text><text x="50%" y="240" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[11] = getUI(tokenId);

        parts[
            14
        ] = '</text><text x="50%" y="270" dominant-baseline="middle" text-anchor="middle" class="base">';

        parts[15] = getState(tokenId);

        parts[16] = "</text></svg>";

        string memory output = string(
            abi.encodePacked(
                parts[0],
                parts[1],
                parts[2],
                parts[3],
                parts[4],
                parts[5],
                parts[6],
                parts[7],
                parts[8]
            )
        );
        output = string(
            abi.encodePacked(
                output,
                parts[9],
                parts[10],
                parts[11],
                parts[12],
                parts[13],
                parts[14],
                parts[15],
                parts[16]
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "TechStack #',
                        toString(tokenId),
                        '", "description": "Your very own unique TechStack which represents you.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(output)),
                        '"}'
                    )
                )
            )
        );
        output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function claim(uint256 tokenId) public nonReentrant {
        require(tokenId > 0 && tokenId < 7778, "Token ID invalid");
        _safeMint(_msgSender(), tokenId);
    }

    function ownerClaim(uint256 tokenId) public nonReentrant onlyOwner {
        require(tokenId > 7777 && tokenId < 8001, "Token ID invalid");
        _safeMint(owner(), tokenId);
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    constructor() ERC721("TechStack", "STACK") Ownable() {}
}
