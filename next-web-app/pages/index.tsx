import styles from "../styles/Home.module.css";
import { createQR, encodeURL, TransactionRequestURLFields } from "@solana/pay";
import { useEffect, useRef } from "react";

const urlParams: TransactionRequestURLFields = {
  link: new URL(`${process.env.NEXT_PUBLIC_URL}/api/mint`),
  label: "CandyPay test",
  message: "https://www.downloadclipart.net/large/candy-png-free-download.png",
};

const Home = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const solanaUrl = encodeURL(urlParams);
      const qr = createQR(solanaUrl, 512, "transparent");
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={qrRef} />
    </div>
  );
};

export default Home;
