import Button from '@mui/material/Button';

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}
