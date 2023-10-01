'use client'

import Head from "next/head";
import { Box } from '@/components/box-content'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <link
          rel="preload"
          href="../public/images/sprites/eat.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/happy.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/sleep.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/stand.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/walk-bottom.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/walk-right.gif"
          as="image"
        />
        <link
          rel="preload"
          href="../public/images/sprites/walk-top.gif"
          as="image"
        />
      </Head>
      <Box/>
    </main>
  )
}
