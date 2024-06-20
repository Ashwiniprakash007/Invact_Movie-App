import { Provider } from 'react-redux';
import './App.css';
import MovieList from './component/MovieList';
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <MovieList/>
    </div>
    </Provider>
  );
}

export default App;
