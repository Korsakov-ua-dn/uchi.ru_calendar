import { useSelector } from 'react-redux';
import Main from './Components/Main';
import Popup from './Components/Popup';

function App() {
  const openModal = useSelector(s => s.app.openModal);

  return (
    < >
      <Main/>
      { openModal && <Popup/> }
    </>
  );
}

export default App;
