import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import Layout from "../component/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
