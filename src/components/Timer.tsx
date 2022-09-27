import { secondsToTime } from '../utils/secondsToTime';

interface Props {
  mainTime: number;
}

export function Timer(props: Props) {
  return <div className="timer">{secondsToTime(props.mainTime)}</div>;
}
