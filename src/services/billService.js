import axios from "axios";

const getBills = async () => {
    const response = await axios.get("http://localhost:3000/bills");
    return response.data;
};

export default {
    getBills
  };