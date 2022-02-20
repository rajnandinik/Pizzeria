import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard';

const PizzaList = ({pizzaList}) => {
  return <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
          Pizzeria's delicious, mouth-watering Pizza now in your town.
          Grab the special discount offer now!!
          Pizza starting from just ₹99. 
      </p>
      <div className={styles.wrapper}>
          {pizzaList.map((pizza)=>(
               <PizzaCard key={pizza._id} pizza={pizza}/>
          ))}
          
      </div>
  </div>;
};

export default PizzaList;
