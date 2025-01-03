import instance from "../axios";

const getBills = async () => {
    const response = await instance.get("/bills");
    return response.data;
};

export const billServices = {
    getBills
};