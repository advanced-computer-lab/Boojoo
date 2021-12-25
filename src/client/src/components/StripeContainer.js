import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import '../App.css';
import NavBar from './navbar';

const PUBLIC_KEY = "pk_test_51KAWXcJlpdeHnsoJM89tZyQrrwDXLMUG4xbKVoZaPDQItgAasr5mHOX19qVv2zckgEVhE0LWkuH4Q7Fid4Y10MB6002QviXjfm"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
        <div className="ShowBookDetails">
		<NavBar/> 
		<Elements stripe={stripeTestPromise}>
            <div className="col-md-8 m-auto">
			<PaymentForm />
            </div>
		</Elements>
        </div>
	)
}