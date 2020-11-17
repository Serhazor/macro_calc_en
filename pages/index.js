import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './components/demo';
    

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       <div>Добро пожаловать в ваш калькулятор макросов</div>
      </main>
      <Demo/>



      <footer className={styles.footer}>
          Тут могла бы быть ваша реклама 
      </footer>
    </div>
  )
}
