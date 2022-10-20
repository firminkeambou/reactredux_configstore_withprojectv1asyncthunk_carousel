import axios from "axios";

/* "Axios. create" is a handy feature within Axios used to create a new instance with a custom configuration.
 With "Axios. create", we can generate a client for any API and reuse the configuration for any calls using the same client,
*/
export default axios.create({
  baseURL: "https://www.omdbapi.com/",
});
