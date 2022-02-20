import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return <div className={styles.container}>
         <div className={styles.item}>
           <Image src="/img/bg.png" alt="" layout='fill' objectFit='cover'/>
         </div>
         <div className={styles.item}>
         <div className={styles.card}>
           <h2 className={styles.motto}>
             SOFT AND WELL BAKED SLICE OF PIZZA
           </h2>
         </div>
         <div className={styles.card}>
           <h1 className={styles.title}>
             FIND OUR RESTAURANTS
           </h1>
           <p className={styles.text}>
             6, Clg rd #304.
             <br />Nashik, 422005
             <br />9994445551
           </p>
           <p className={styles.text}>
             6, Senapati Bapat rd #304.
             <br />Pune, 411002
             <br />9994445552
           </p>
           <p className={styles.text}>
             6, Meera Rd #304.
             <br />Mumbai, 401107
             <br />9994445553
           </p>
         </div>
         <div className={styles.card}>
           <h1 className={styles.title}>WORKING HOURS</h1>
           <p className={styles.text}>
             MONDAY TO FRIDAY
             <br />9:00 - 22:00
           </p>
           <p className={styles.text}>
             SATURDAY - SUNDAY
             <br />12:00 - 24:00
           </p>
         </div>
         </div>
      
  </div>;
};

export default Footer;
