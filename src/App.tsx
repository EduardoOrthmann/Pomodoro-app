import './App.css';

import { PomodoroTimer } from './components/PomodoroTimer';

function App() {
  return (
    <div className="app">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  );
}

export default App;
