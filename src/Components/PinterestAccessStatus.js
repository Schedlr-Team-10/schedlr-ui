import { useEffect } from "react";
import axios from 'axios';
import { PINTEREST_AUTH_CODE } from "./util/Constants";

const PinterestAccessStatus = () => {

    const getPInterestAccessTokenWithAuthcode = async (code, userId) => {
        try {
            console.log("Calling SPRING BOOT API");
            const response = await axios.post(PINTEREST_AUTH_CODE, {
                userId,
                code
            });
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error sending code to backend:', error);
        }
    };

    useEffect ( () => {
        const id = localStorage.getItem("userId");

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        getPInterestAccessTokenWithAuthcode(code,id);
    },[])

    return (
      <div className="py-10">
        <div className="flex justify-center items-center py-5">
          <img
            className="w-[200px] h-[200px]"
            src="https://media.istockphoto.com/id/2119163357/vector/loading-completed-abstract-approval-tick-icon.jpg?s=612x612&w=0&k=20&c=EMMzB3O48hSrxNFF17K3otNBbmgixeKSs_STXl5vG6k="
          />
        </div>
        <div>
          <h4>Successfully Integrated your Pinterest Account to our App </h4>
        </div>
      </div>
    );
}

export default PinterestAccessStatus;