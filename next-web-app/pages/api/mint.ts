import type { NextApiRequest, NextApiResponse } from "next";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { candypay } from "@candypay/sdk";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json({
      label: "CandyPay Test",
      icon: "https://www.downloadclipart.net/large/candy-png-free-download.png",
    });
  }

  if (req.method === "POST") {
    const { account } = req.body;

    try {
      const wallet = new PublicKey(account);

      const ixnArray = await candypay.mint(
        "devnet",
        "Bfo2wFFYx9vPn8eip1gnJ3kabs7CktW3pJ9iRq26SRmj",
        wallet
      );

      const transaction = new Transaction().add(...ixnArray.instructions);
      const connection = new Connection("https://api.devnet.solana.com");

      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet;

      transaction.partialSign(ixnArray["mint"]);
      const serializeTransaction = transaction.serialize({
        requireAllSignatures: false,
      });

      const base64 = serializeTransaction.toString("base64");
      const message = "CandyPay Test";

      return res.status(200).json({
        transaction: base64,
        message,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
};

export default handler;
