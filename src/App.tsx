import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Featured from './components/Featured';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {

  const sidebarStatus = useSelector((state: RootState) => state.sidebarStatus);

  return (
    <div className="App">
      <Router>
        <Container fluid style={{ 'paddingLeft': 0, 'paddingRight': 0 }}>
          <Header />

            <div className="main-page">
              { sidebarStatus.value ? <Sidebar /> : null }
            </div>
        </Container>

        <Routes>
          <Route path='/' element={<Featured />} />
          <Route path='/video/:videoID' element={<VideoPlayer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;