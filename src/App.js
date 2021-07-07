import logo from './logo.svg';
import './App.css';
import VideoPlayer from './components/VideoPlayer'

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexWrap: 'wrap'  ,justifyContent: 'center'}}>
      <div style={{ width: '100%', flexBasis: '100%' , height: '48px', background: '#0072dc' }}>
      </div>
      <div style={{ width: '100%', flexBasis: '100%' , height: '42px', background: '#00509a' }}>
      </div>

      <div style={{ flexBasis: '50%', flexShrink: '1', marginTop: '1rem', textColor: 'white', minHeight: '100vh' }}>
        <VideoPlayer  height='361' style={{ width: '100%', position: 'relative', display: 'block' }}
          controls
        >
        </VideoPlayer>
      </div>
      
    </div>
  );
}

export default App;
