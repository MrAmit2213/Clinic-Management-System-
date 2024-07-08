import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BookAppointment from './components/BookAppointment';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Personal from './components/Personal';
import ConsultationHistory from './components/ConsultationHistory';
import Help from './components/Help';
import VacinationHistory from './components/VacinationHistory';
import PaymentHistory from './components/PaymentHistory';
import BlogPage from './components/BlogPage';
import Appointment from './components/Appointment';
import { useSelector } from 'react-redux';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';
// import Dashboard from './components/Dashboard';
import AdminTransaction from './components/AdminTransaction';
import AdminEmployers from './components/AdminEmployers';
import AdminHealthRecord from './components/AdminHealthRecord';
import AdminPatient from './components/AdminPatient';
import AdminBlog from './components/AdminBlog';
// import Sample from './components/sample';

function App() {
  const authData = useSelector(state => state.Reducer);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/bookAppointment/:id" element={<BookAppointment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          {
            authData.user === 'admin' &&
            <Route path="/admin" element={<Admin />}>
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="transactions" element={<AdminTransaction />} />
              <Route path="employers" element={<AdminEmployers />} />
              <Route path="healthRecord" element={<AdminHealthRecord />} />
              <Route path="patientManagement" element={<AdminPatient />} />
              <Route path="blogs" element={<AdminBlog />} />
              <Route path="profile" element={<Profile />} >
                <Route index element={<Personal />} />
              </Route>
            </Route>
          }
          {
            authData.user === 'user' &&
            <Route path="/profile" element={<Profile />}>
              <Route index element={<Personal />} />
              <Route path="consultationHistory" element={<ConsultationHistory />} />
              <Route path="help" element={<Help />} />
              <Route path="vacinationHistory" element={<VacinationHistory />} />
              <Route path="paymentHistory" element={<PaymentHistory />} />
            </Route>
          }
        </Routes>
        <Footer />
        {/* <Sample /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
