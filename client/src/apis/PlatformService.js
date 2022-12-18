import axios from 'axios';
import axiosRetry from 'axios-retry';

// Components (reducers) use this client to communicate with the platform
const PlatformService = axios.create({
  baseURL: 'http://localhost:7000/api/v1', // Dev URI (would later check the environment to determine URI)
  timeout: 5000,
});

axiosRetry(PlatformService, { retries: 3 });

export default PlatformService;
