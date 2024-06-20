import axios from 'axios';


function useAxiosInstance() {
  
  const token = localStorage.getItem("token");
  //alert("JWT :"+token);

  const instance = axios.create({
    baseURL: '', //http://localhost:5001
  });

  instance.interceptors.request.use((config) => {
     if (token)
     {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return { instance };
}

export default useAxiosInstance;
