import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './components/demo';

    

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>World's best macro calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.grid}>
      <a href="https://www.alexsifitness.com/"><img src="/images/asflogo.png" alt="" style={{maxHeight: 150}}/></a>
       <div className={styles.grid}><h2>World's best macronutrient calculator</h2></div>
       <br/>       
      </main>
      <Demo className={styles.container}/>


      <footer className={styles.grid} style={{fontSize: "small"}}>
          All rights were exchanged to carbohydrates &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
