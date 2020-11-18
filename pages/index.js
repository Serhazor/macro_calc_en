import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './components/demo';

    

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
      <meta name="viewport" content="width=device-width; initial-scale=1.0"/>
        <title>World's best macro calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <img src="/images/asflogo.png" alt="" style={{maxHeight: 150}}/>
       <div><h2>Добро пожаловать в ваш калькулятор макросов</h2></div>
       <br/>
       <div>Поверните телефон в горизонтальное положение</div>
       <img src="/images/phoneRotate.png" alt="" />
       
      </main>
      <Demo/>


      <footer className={styles.footer}>
          Тут могла бы быть ваша реклама 
      </footer>
    </div>
  )
}
