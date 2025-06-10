import Footer from './Component/Footer'
import GridData from './Component/GridData'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
   
   <>
   
  <GridData/>
  <Footer/>
  <ToastContainer position="top-right" autoClose={3000} />
  </>
  )
}

export default App
