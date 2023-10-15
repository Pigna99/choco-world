'use client'

import { Box } from '@/components/box-content'
import styles from './page.module.css'
import { AppProvider } from "@/components/context/appcontext";
import { AudioProvider } from '@/components/context/audiocontext';
import { GlobalProvider } from '@/components/context/globalcontext';
import { ScreenProvider } from '@/components/context/screencontext';
import { MenuProvider } from '@/components/context/menucontext';
import { FetchProvider } from '@/components/context/fetchcontext';
export default function Home() {
  return (
    <main className={styles.main}>
      <GlobalProvider>
        <AudioProvider>
          <ScreenProvider>
            <MenuProvider>
              <FetchProvider>
                <AppProvider>
                  <Box/>
                </AppProvider>
              </FetchProvider>
            </MenuProvider>
          </ScreenProvider>
        </AudioProvider>
      </GlobalProvider>
    </main>
  )
}
