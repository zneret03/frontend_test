import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";
import { fetchUser } from "@/services/user/user.service";

export default async function Home() {
  const response = await fetchUser();

  console.log(response);

  return <main className={styles.main}></main>;
}
