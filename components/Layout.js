import React from 'react'
import Head from 'next/head'
import Header from './Header'
const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Mattu Send</title>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                <link rel="manifest" href="/static/site.webmanifest" />
                <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#878787" />
                <meta name="msapplication-TileColor" content="#d0d0d0" />
                <meta name="theme-color" content="#cbcbcb" />
            </Head>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-10">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
