import Head from "next/head";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Event App</title>
          <meta name="description" content="Event App" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
       
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
