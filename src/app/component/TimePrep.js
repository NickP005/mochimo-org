
import { useEffect, useState } from 'react';

export default function TimePrep ({ epoch }) {
  const [time, setTime] = useState({ prep: 'ago', frame: 'secs', amount: 0 });
  const updateTime = (update) => setTime((state) => ({ ...state, ...update }));
  const getEpochDelta = (to) => ((Date.now() / 1000) | 0) - to;

  useEffect(() => {
    const timer = setInterval(() => {
      // define initial amount as seconds, and derive/remove sign
      let amount = getEpochDelta(epoch);
      const sign = amount < 0 ? -1 : 1;
      // store time preparation
      updateTime({ prep: sign < 0 ? 'from now' : 'ago' });
      // correct sign and compare amount against predetermined timeframes
      amount *= sign;
      if (amount < 60) updateTime({ frame: 'secs', amount });
      else { // progress amount to minutes
        amount = (amount / 60) | 0;
        if (amount < 60) updateTime({ frame: 'mins', amount });
        else { // progress amount to hours
          amount = (amount / 60) | 0;
          if (amount < 24) updateTime({ frame: 'hours', amount });
          else { // progress amount to days
            amount = (amount / 24) | 0;
            updateTime({ frame: 'days', amount });
          }
        }
      }
    }, 1000);
    // return function to clear interval timer on unmount
    return () => clearInterval(timer);
  }, [epoch]);
  // return TimePrep JSX in a span
  return (
    <span title={new Date(epoch * 1000)}>
      {time.amount} {time.frame} {time.prep}
    </span>
  );
}
