import ubuybluesLogo from "../../../public/images/UbuyBlues_Logo_merged_Purple.webp";
import { MdProductionQuantityLimits } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/router";

export default function AdminDashboardSideBar({ activeParentLink, activeChildLink }) {

    const [activeLinks, setActiveLinks] = useState(activeParentLink);

    const router = useRouter();

    const adminLogout = () => {
        localStorage.removeItem("asfour-store-admin-user-id");
        router.push("/admin-dashboard/login");
    }

    return (
        <aside className="admin-dashboard-side-bar pt-3">
            <Link href="/admin-dashboard" className="d-block text-center mb-3">
                <img src={ubuybluesLogo.src} alt="logo" width="80" height="80" className="logo" />
            </Link>
            <button className="btn btn-danger d-block mx-auto w-50 logout-btn" onClick={adminLogout}>
                <MdOutlineLogout className="me-2" />
                <span>Logout</span>
            </button>
            <hr className="mb-0" />
            <ul className="managment-items-list">
                <li
                    className={`managment-item ps-3 p-2 ${activeLinks === "products-managment" ? "active" : ""}`}
                    onClick={() => activeLinks ? setActiveLinks("") : setActiveLinks("products-managment")}
                >
                    <MdProductionQuantityLimits className="me-2" />
                    <button
                        className="managment-button btn p-0"
                    >
                        <span>Products</span>
                    </button>
                </li>
                {activeLinks === "products-managment" && <ul className="links-list">
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "add-new-product" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/add-new-product",
                                query: {
                                    activeParentLink: "products-managment",
                                    activeChildLink: "add-new-product"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Add New</span>
                        </Link>
                    </li>
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "update-and-delete-products" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/update-and-delete-products",
                                query: {
                                    activeParentLink: "products-managment",
                                    activeChildLink: "update-and-delete-products"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Update / Delete</span>
                        </Link>
                    </li>
                </ul>}
                <li
                    className={`managment-item ps-3 p-2 ${activeLinks === "categories-managment" ? "active" : ""}`}
                    onClick={() => activeLinks ? setActiveLinks("") : setActiveLinks("categories-managment")}
                >
                    <MdProductionQuantityLimits className="me-2" />
                    <button
                        className="managment-button btn p-0"
                    >
                        <span>Categories</span>
                    </button>
                </li>
                {activeLinks === "categories-managment" && <ul className="links-list">
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "add-new-category" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/add-new-category",
                                query: {
                                    activeParentLink: "categories-managment",
                                    activeChildLink: "add-new-category"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Add New</span>
                        </Link>
                    </li>
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "update-and-delete-categories" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/update-and-delete-categories",
                                query: {
                                    activeParentLink: "products-managment",
                                    activeChildLink: "update-and-delete-categories"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Update / Delete</span>
                        </Link>
                    </li>
                </ul>}
                <li
                    className={`managment-item ps-3 p-2 ${activeLinks === "orders-managment" ? "active" : ""}`}
                >
                    <MdProductionQuantityLimits className="me-2" />
                    <Link
                        href={{
                            pathname: "/admin-dashboard/orders-managment",
                            query: {
                                activeParentLink: "orders-managment",
                                activeChildLink: "orders-managment",
                            }
                        }}
                        className="managment-button btn p-0"
                    >Orders Managment</Link>
                </li>
                <li
                    className={`managment-item ps-3 p-2 ${activeLinks === "brands-managment" ? "active" : ""}`}
                    onClick={() => activeLinks ? setActiveLinks("") : setActiveLinks("brands-managment")}
                >
                    <MdProductionQuantityLimits className="me-2" />
                    <button
                        className="managment-button btn p-0"
                    >
                        <span>Brands</span>
                    </button>
                </li>
                {activeLinks === "brands-managment" && <ul className="links-list">
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "add-new-brand" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/add-new-brand",
                                query: {
                                    activeParentLink: "brands-managment",
                                    activeChildLink: "add-new-brand"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Add New</span>
                        </Link>
                    </li>
                    <li className={`link-item ps-3 p-2 ${activeChildLink === "update-and-delete-brands" ? "active" : ""}`}>
                        <Link
                            href={{
                                pathname: "/admin-dashboard/update-and-delete-brands",
                                query: {
                                    activeParentLink: "brands-managment",
                                    activeChildLink: "update-and-delete-brands"
                                }
                            }}
                            className="managment-link p-0"
                        >
                            <span>Update / Delete</span>
                        </Link>
                    </li>
                </ul>}
                <li
                    className={`managment-item ps-3 p-2 ${activeLinks === "show-and-hide-sections-managment" ? "active" : ""}`}
                >
                    <MdProductionQuantityLimits className="me-2" />
                    <Link
                        href={{
                            pathname: "/admin-dashboard/show-and-hide-sections-managment",
                            query: {
                                activeParentLink: "show-and-hide-sections-managment",
                                activeChildLink: "show-and-hide-sections-managment",
                            }
                        }}
                        className="managment-button btn p-0"
                    >Show / Hide Sections</Link>
                </li>
            </ul>
        </aside>
    );
}