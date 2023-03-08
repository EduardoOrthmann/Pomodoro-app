import { useCallback, useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import { secondsToTime } from '../utils/secondsToTime';
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
  const [isResting, setIsResting] = useState(false);
  const [cyclesManager, setCyclesManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (isWorking) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setIsWorking(true);
    setIsResting(false);
    setMainTime(props.pomodoroTime);
  }, [setTimeCounting, setIsWorking, setIsResting, setMainTime, props.pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setIsWorking(false);
      setIsResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [
      setTimeCounting,
      setIsWorking,
      setIsResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (isWorking) document.body.classList.add('working');
    if (isResting) document.body.classList.remove('working');
    if (mainTime > 0) return;

    if (isWorking && cyclesManager.length > 0) {
      configureRest(false);
      cyclesManager.pop();
    } else if (isWorking && cyclesManager.length <= 0) {
      configureRest(true);
      setCyclesManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (isWorking) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (isResting) configureWork();
  }, [
    isWorking,
    isResting,
    mainTime,
    cyclesManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    configureWork,
    setCyclesManager,
    props.cycles,
  ]);

  return (
    <div className="pomodoro-timer">
      <h2>Você está {isWorking ? 'trabalhando' : 'descansando'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="Rest" onClick={() => configureRest(false)} />
        <Button
          className={!isWorking && !isResting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
