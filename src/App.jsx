import { useEffect } from 'react'
import { useAuth } from './components/AuthContext';
import axios from 'axios';
import Login from './components/Login';
import Protected from './components/Protected';
import './App.css';


function App() {
  const { user, setUser } = useAuth();

  async function fetchProfile() {
    const response = await axios.get('http://localhost:3001/profile', { withCredentials: true });
    if (response.data) {
      alert(response.data);
      //setUser(response.data);
    }
  }

  useEffect(function () {
    fetchProfile();
  }, [setUser]);

  return user ? <Protected /> : <Login />;
}

export default App;