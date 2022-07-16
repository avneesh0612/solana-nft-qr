import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.post(
    "https://public-api.candypay.fun/api/v1/generate",
    {
      candyMachineID: "Bfo2wFFYx9vPn8eip1gnJ3kabs7CktW3pJ9iRq26SRmj",
      network: "devnet",
      message: "Thanks for minting the NFTs <3",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    }
  );

  return res.status(200).json(response.data);
};

export default handler;
