import Head from 'next/head';

import Navigation from './navigation';

export type ExplorerLayoutProps = React.PropsWithChildren<unknown>;

export type LayoutProps = React.PropsWithChildren<{
  title: string;
  description: string;
  image?: string;
}>;

export function ExplorerLayout({ children }: ExplorerLayoutProps) {
  return (
    <Layout
      title="Explorer"
      description="Marabu Blockchain Explorer"
    >
      {children}
    </Layout>
  );
}

export default function Layout({
  title,
  description,
  image,
  children
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="marabu" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        {image && <meta property="og:image:alt" content={title} />}

        {/* Twitter */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
        {image && <meta name="twitter:image:alt" content={title} />} */}
      </Head>
      <main>
        <Navigation />
        {children}
      </main>
    </>
  );
}
