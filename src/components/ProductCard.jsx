/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from '../Helper/axiosInstance.js';


export default function ProductCard({ farmer, factory }) {
    const [amount, setamount] = useState(350);

    const handlePayment = async () => {
        try {
          const response = await axiosInstance.post("/payment/order", { amount,
            farmerId: farmer._id,  // ✅ Include farmerId
            factoryId: factory.id   // ✅ Include factoryId 
          });

          const data = response.data; // Get the response data directly
          console.log(data);
          console.log(farmer.fullName);
          console.log(factory.name);

          handlePaymentVerify(data.data)
          return data;
        } catch (error) {
          console.log(error);
        }
      };


      const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Ethanol_Supply_chain",
            description: "Test Mode",
            order_id: data.id,

            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await axiosInstance.post("/payment/verify", 
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            farmerId: farmer._id,
                            factoryId: factory.id
                        }
                    )
                    

                    const verifyData = await res.data;

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
      
    return (
        <Card className="mt-6 w-50  text-white">
                <Button onClick={handlePayment} className=" bg-[#1B9CFC]">Pay to Farmer</Button>
                <Toaster/>
        </Card>
    );
}


// ✅ Add PropTypes for validation
ProductCard.propTypes = {
    farmer: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string,
        mobileNumber: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
    }),
    factory: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
    }),
};