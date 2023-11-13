import Head from "next/head";
import Header from "@/components/Header";
import CustomerDashboardSideBar from "@/components/CustomerDashboardSideBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import LoaderPage from "@/components/LoaderPage";
import Link from "next/link";

export default function CustomerAddreses() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const userId = localStorage.getItem("asfour-store-user-id");
        if (userId) {
            Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`)
                .then((res) => {
                    const result = res.data;
                    if (result !== "Sorry, The User Is Not Exist !!, Please Enter Another User Id ..") {
                        setIsLoadingPage(false);
                    } else {
                        router.push("/auth");
                    }
                })
                .catch((err) => console.log(err));
        } else {
            router.push("/auth");
        }
    }, []);
    return (
        <div className="customer-addreses">
            <Head>
                <title>Asfour Store - Customer Addreses</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <CustomerDashboardSideBar />
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="address-name-and-editing-link d-flex justify-content-between p-3">
                                            <span className="text-white">Billing Address</span>
                                            <Link href="/customer-dashboard/addreses/billing-address" className="editing-link">Edit</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="address-name-and-editing-link d-flex justify-content-between p-3">
                                            <span className="text-white">Shipping Address</span>
                                            <Link href="/customer-dashboard/addreses/shipping-address" className="editing-link">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <LoaderPage />}
        </div>
    );
}