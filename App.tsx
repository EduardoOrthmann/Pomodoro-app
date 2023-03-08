import './App.css';

import { PomodoroTimer } from './components/PomodoroTimer';

function App() {
  return (
    <div className="app">
      <PomodoroTimer pomodoroTime={10} shortRestTime={2} longRestTime={5} cycles={4} />
    </div>
  );
}

export default App;
