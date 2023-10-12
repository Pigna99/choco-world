'use client'

import { Box } from '@/components/box-content'
import styles from './page.module.css'
import { GlobalProvider } from "@/components/context";

export default function Home() {
  return (
    <main className={styles.main}>

      <GlobalProvider>
        <Box/>
      </GlobalProvider>
    </main>
  )
}
