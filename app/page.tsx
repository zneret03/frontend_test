import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";
import { fetchUser } from "@/services/user/user.service";

export default async function Home() {
  const users = await fetchUser();

  console.info(users);

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
