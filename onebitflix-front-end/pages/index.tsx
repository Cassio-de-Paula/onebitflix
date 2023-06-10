import Head from "next/head";
import styles from '../styles/homeNoAuth.module.scss'
import HeaderNoAuth from "@/components/services/homeNoAuth/headerNoAuth";

const HomeNotAuth = function () {
  return (
		<>
			<Head>
         <title>Onebitflix</title>
         <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
         <meta property="og:title" content="Onebitflix" key="title"/>
         <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de forma simples e fácil!"/>
      </Head>
			<main><HeaderNoAuth/></main>
		</>
  )
};

export default HomeNotAuth;
