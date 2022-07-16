import { createQR } from "@solana/pay";
import axios from "axios";
import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

const PvtApi = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRCode = async () => {
    const response = await axios.get("/api/get-qr");

    const qr = createQR(response.data.solanaURL, 512, "transparent");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className={styles.container}>
      <div ref={qrRef} />
    </div>
  );
};

export default PvtApi;
