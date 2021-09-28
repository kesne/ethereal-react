/**
 * A minimal ABI definition for an ERC20 token.
 */
export const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

/**
 * An ABI definition for ERC165.
 */
export const ERC165_ABI = [
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
];

/**
 * A minimal ABI definition for an ERC721 (non-fungible) token.
 */
export const ERC721_ABI = [
  ...ERC165_ABI,
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  "function balanceOf(address owner) view returns (uint256 balance)",
  "function ownerOf(uint256 tokenId) view returns (address owner)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address operator)",
  "function setApprovalForAll(address operator, bool _approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)",
];
