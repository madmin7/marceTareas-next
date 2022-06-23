import { Box } from "@mui/material"
import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar, Sidebar } from "../ui"

// sx == style pero tiene acceso al Theme

interface Props {
    title?: string
}




export const Layout :FC <PropsWithChildren <Props> > = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{
        flexFlox:1,
    }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />
        <Sidebar />

        <Box sx= {{ padding: '10px 20px' }}>
            { children }
        </Box>
    </Box>
  )
}
