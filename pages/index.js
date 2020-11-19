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
      <img src="/images/asflogo.png" alt="" style={{maxHeight: 250}}/>
       <div><h2>Лучший в мире калькулятор калорий и макронутриентов (КБЖУ) от Alex Si Fitness</h2></div>
       <br/>
       <div>Если вы зашли со смартфона, то поверните его в горизонтальное положение</div>
       <img src="/images/phoneRotate.png" alt="" />
       
      </main>
      <Demo className={styles.container}/>


      <footer className={styles.footer}>
          Все права пропиты или обменяны на углеводы.
      </footer>
    </div>
  )
}
