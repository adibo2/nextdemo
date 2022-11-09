import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';

function MeetupItem(props) {
  const router=useRouter();
  const showdetails=()=>{
    router.push('/'+props.id)

  }


  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.img}/>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showdetails}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
