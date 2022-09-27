import { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import { Button } from './Button';
import { Timer } from './Timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (isWorking) document.body.classList.add('working');
  }, [isWorking]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setIsWorking(true);
  };

  return (
    <div className="pomodoro-timer">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="teste" onClick={() => console.log('opa')} />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Testando</p>
        <p>Testando</p>
        <p>Testando</p>
        <p>Testando</p>
        <p>Testando</p>
        <p>Testando</p>
      </div>
    </div>
  );
}
