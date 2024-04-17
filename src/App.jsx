import { useState, useEffect } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleErrors = {};

    if (!formValues.username.trim()) {
      handleErrors.username = "Username is required";
    } else if (formValues.username.length < 3) {
      handleErrors.username = "Username is not valid!";
    }

    if (!formValues.email.trim()) {
      handleErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      handleErrors.email = "Email is not valid";
    }

    if (!formValues.password.trim()) {
      handleErrors.password = "Password is required!";
    } else if (formValues.password.length < 5) {
      handleErrors.password = "Password must be at least 5 characters";
    } else if (formValues.password.length > 10) {
      handleErrors.password = "Password must be not more than 10 characters";
    }

    setErrors(handleErrors);
    setIsSubmit(true);

  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      setFormValues(initialValues);
      toast.success("Login Successfully");
    }
  }, [errors]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='w-full h-screen bg-gray-400 flex justify-center items-center'>
        <div className='bg-white w-[350px] md:w-[400px] h-auto p-5 rounded-lg shadow-md'>
          <h1 className='text-center text-[1.8rem] md:text-3xl font-semibold'>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <div className='w-full flex flex-col mt-5'>
              <label htmlFor="username" className='text-lg font-[500]'>Username :</label>
              <input type="text" name='username' placeholder='Enter Username' onChange={handleChange} value={formValues.username} autoComplete='off' className='focus:outline-none border border-gray-400 py-2 px-4 rounded mt-2 mb-1' />
              {errors.username && <p className='text-red-500 text-base font-medium'>{errors.username}</p>}
            </div>

            <div className='w-full flex flex-col mt-3'>
              <label htmlFor="email" className='text-lg font-[500]'>Email :</label>
              <input type="text" name='email' placeholder='Enter Email' onChange={handleChange} value={formValues.email} autoComplete='off' className='focus:outline-none border border-gray-400 py-2 px-4 rounded mt-2 mb-1' />
              {errors.email && <p className='text-red-500 text-base font-medium'>{errors.email}</p>}
            </div>

            <div className='w-full flex flex-col mt-3'>
              <label htmlFor="password" className='text-lg font-[500]'>Password :</label>
              <input type="password" name='password' placeholder='Enter Password' onChange={handleChange} value={formValues.password} autoComplete='off' className='focus:outline-none border border-gray-400 py-2 px-4 rounded mt-2 mb-1' />
              {errors.password && <p className='text-red-500 text-base font-medium'>{errors.password}</p>}
            </div>
            <button type='submit' className='mt-3 w-full py-2 bg-blue-700 text-white rounded cursor-pointer font-[500] focus:outline-none hover:bg-blue-800 transition-all duration-200'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
