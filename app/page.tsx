'use client'

import { Box } from '@/components/box-content'
import styles from './page.module.css'
import { AppProvider } from "@/components/context/appcontext";
import { AudioProvider } from '@/components/context/audiocontext';
import { GlobalProvider } from '@/components/context/globalcontext';
import { ScreenProvider } from '@/components/context/screencontext';
export default function Home() {
  return (
    <main className={styles.main}>
      <GlobalProvider>
        <AudioProvider>
          <ScreenProvider>
            <AppProvider>
              <Box/>
            </AppProvider>
          </ScreenProvider>
        </AudioProvider>
      </GlobalProvider>
    </main>
  )
}
