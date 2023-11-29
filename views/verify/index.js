const axios = require('axios');

( async() => {
  const token = window.location.pathname.split('/')[2];
  const { data }  = await axios.patch('/api/users', token);
  console.log(data);
})();