import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import logoImg from "../assets/logo.svg"
import { Container, Header } from "../styles/pages/app"

import Image from "next/future/image"
import {Provider} from 'react-redux'
import { store } from "../store/config"
import { Cart } from "../components/Cart"
import { useRouter } from "next/router"

globalStyles()

function App({ Component, pageProps }: AppProps) {
  const { push } = useRouter()

  const goToHome = () => push('/')

  return (
    <Container>
      <Provider store={store}>
        <Header>
          <Image onClick={goToHome} src={logoImg} alt="Logo da loja" />

          <Cart />
        </Header>

        <Component {...pageProps} />
      </Provider>
    </Container>
  )
}

export default App
