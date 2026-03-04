import './App.css';
import Dashboard from './dashboard/page';
import { ToastProvider } from './components/toast/toast';

function App() {
  return(
    <ToastProvider>
    <Dashboard />
    </ToastProvider>
  )
}

export default App;
