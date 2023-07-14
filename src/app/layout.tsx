import Navbar from '@/components/views/Navbar'
import Wrapper from '@/components/shared/Wrapper'
import './globals.css'
import { Maven_Pro } from 'next/font/google'
import Footer from '@/components/views/Footer'


const inter = Maven_Pro({ subsets: ['latin'],
weight:["400","500","600","700","800","900"]
})

export const metadata = {
  title: 'Dine Market',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
        <Navbar/>
        {/* <div className="min-h-screen"> */}
        {children}
        {/* </div>
        <Footer/> */}
        </Wrapper>
        </body>
    </html>
  )
}
