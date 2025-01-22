// pages/_app.js
import '../app/globals.css'; // Adjust the path if necessary

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
