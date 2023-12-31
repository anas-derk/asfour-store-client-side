import Head from "next/head";
import Header from "@/components/Header";
import CustomerDashboardSideBar from "@/components/CustomerDashboardSideBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoaderPage from "@/components/LoaderPage";
import Link from "next/link";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function CustomerDashboard() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [userInfo, setUserInfo] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("asfour-store-user-id");
        if (userId) {
            axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`)
                .then((res) => {
                    const result = res.data;
                    if (result !== "Sorry, The User Is Not Exist !!, Please Enter Another User Id ..") {
                        setUserInfo(result);
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

    const userLogout = () => {
        localStorage.removeItem("asfour-store-user-id");
        router.push("/auth");
    }

    return (
        <div className="customer-dashboard">
            <Head>
                <title>Ubuyblues Store - Customer Dashboard</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header />
                <div className="page-content d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3">
                                <CustomerDashboardSideBar />
                            </div>
                            <div className="col-xl-9">
                                <div className="customer-info-and-managment-account-links-for-customer">
                                    <h1 className="welcome-msg fw-bold mb-4">
                                        <span className="me-2">Hello {userInfo.email} ( not {userInfo.email} ?)</span>
                                        <button className="logout-btn managment-link" onClick={userLogout}>Log out</button>
                                    </h1>
                                    <h2 className="h6 managment-links">
                                        <span className="me-2">From your account dashboard you can view your</span>
                                        <Link href="/customer-dashboard/orders" className="managment-link me-2">recent orders</Link>
                                        <span className="me-2">manage your</span>
                                        <Link href="/customer-dashboard/addreses" className="managment-link me-2">shipping and billing addresses</Link>
                                        <span className="me-2">and</span>
                                        <Link href="/customer-dashboard/account-details" className="managment-link me-2">edit your password and account details</Link>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    )
}