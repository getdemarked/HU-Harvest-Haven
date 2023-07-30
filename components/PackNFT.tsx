import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../const/addresses";
import { MediaRenderer, Web3Button, useAddress, useContract, useDirectListings, useNFT } from "@thirdweb-dev/react";
import React, { useState } from "react"; // Make sure to import useState
import styles from "../styles/Home.module.css";
// ... (other imports)

type Props = {
  contractAddress: string;
  tokenId: any;
};

export const PackNFTCard = ({ contractAddress, tokenId }: Props) => {
  const address = useAddress();
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: packContract } = useContract(contractAddress);
  const { data: packNFT, isLoading: loadingNFT } = useNFT(packContract, tokenId);

  const { data: packListings, isLoading: loadingPackListings } = useDirectListings(marketplace, {
    tokenContract: PACK_ADDRESS,
  });

  console.log("Pack Listings: ", packListings);

  async function buyPack() {
    let txResult;

    if (packListings?.[tokenId]) {
      txResult = await marketplace?.directListings.buyFromListing(packListings[tokenId].id, 1);
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }

  const defaultImage = "https://bafybeiaksoe7uimsot3xksuoz6z4t67fdj2gl4ptnu7bwvk62yqmxh3zty.gateway.ipfscdn.io/treasure-box-cover.gif"; // Replace this with the URL of your default image

  return (
    <div className={styles.packCard}>
      {!loadingNFT && !loadingPackListings ? (
        <div className={styles.shopPack}>
          <div>
            {packNFT?.metadata.image ? (
              <MediaRenderer src={packNFT.metadata.image} width="80%" height="100%" />
            ) : (
              <img src={defaultImage} alt="Default" width="80%" height="100%" />
            )}
          </div>
          <div className={styles.packInfo}>
            {packNFT?.metadata.image ? ( // Ensure packNFT is not null before accessing its properties
              <>
                <h3>{packNFT.metadata.name}</h3>
                <p>
                  Cost: {packListings![tokenId].currencyValuePerToken.displayValue}{" "}
                  {` ` + packListings![tokenId].currencyValuePerToken.symbol}
                </p>
                <p>Supply: {packListings![tokenId].quantity}</p>
                {!address ? <p>Login to buy</p> : <Web3Button contractAddress={MARKETPLACE_ADDRESS} action={() => buyPack()}>Buy</Web3Button>}
              </>
            ) : (
              <p>No metadata found for tokenId {tokenId}</p> // Show an error message if metadata is missing
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
