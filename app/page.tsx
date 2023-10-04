'use client'

import Head from "next/head";
import { Box } from '@/components/box-content'
import styles from './page.module.css'
import { spritesArray, spritesList } from "@/utils/frontend/utilsFrontend";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        {
          spritesArray.map((sprite:spritesList)=>{
            return(
              <link
                rel="preload"
                href={`/images/sprites/${sprite}.gif`}
                as="image"
                key={sprite}
              />
            )
          })
        }
      </Head>
      <Box/>
    </main>
  )
}
