import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "polygon");

  const packAddress = "0x96e8927194394676dcA68BFeddE2dba7376B710F";
  const cardAddress = "0x89568eA3bE7317C00bdc2a0aF4d7Af868Aa79d52";
  const cardAddress2 = "0x2D00185466b19852e3Bfcb2A2b96Dc5ad73E8e67";

  const pack = await sdk.getContract(packAddress, "pack"); // Add await here
  const card = await sdk.getContract(cardAddress, "edition-drop"); // Add await here
  const card2 = await sdk.getContract(cardAddress2, "edition-drop"); // Add await here
  await card.setApprovalForAll(packAddress, true);
  await card2.setApprovalForAll(packAddress, true);
  console.log("Approved card contract to transfer cards to pack contract");

  const packImage =
    "https://edgeurid.estuary.tech/gw/ipfs/bafybeigxb53zrqvseo2fm3wl53lzhtm6kvaljltek5tbzk6ns5syl3l4by";

  console.log("Creating Mystery Boxes");
  const createPacks = await pack.create({
    packMetadata: {
      name: "Founding Treasure Box II",
      description:
        "In the world of Heroes Uprising, the Founding Treasure Box II is a mysterious artifact coveted by adventurers. Its ever-changing location and custom trials challenge seekers.",
      image: packImage,
    },
    erc1155Rewards: [
{
  contractAddress: cardAddress,
  tokenId: 0,
  quantityPerReward: 1,
  totalRewards: 125,
},
{
  contractAddress: cardAddress,
  tokenId: 1,
  quantityPerReward: 1,
  totalRewards: 125,
},
{
  contractAddress: cardAddress,
  tokenId: 2,
  quantityPerReward: 1,
  totalRewards: 125,
},
{
  contractAddress: cardAddress,
  tokenId: 3,
  quantityPerReward: 1,
  totalRewards: 125,
},
{
  contractAddress: cardAddress,
  tokenId: 4,
  quantityPerReward: 1,
  totalRewards: 100,
},
{
  contractAddress: cardAddress,
  tokenId: 5,
  quantityPerReward: 1,
  totalRewards: 100,
},
        ],
        rewardsPerPack: 1,
    });

    console.log("Mystery Boxes created");
  })();