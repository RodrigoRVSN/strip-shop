import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import logoImg from "../assets/logo.svg"
import { Container, Header } from "../styles/pages/app"

import Image from "next/future/image"
import {Provider} from 'react-redux'
import { store } from "../store/config"
import { Cart } from "../components/Cart"

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Provider store={store}>
        <Header>
          <Image src={logoImg} alt="Logo da loja" />

          <Cart />
        </Header>

        <Component {...pageProps} />
      </Provider>
    </Container>
  )
}

export default App
