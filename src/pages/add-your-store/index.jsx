import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import NotFoundError from "@/components/NotFoundError";
import { HiOutlineBellAlert } from "react-icons/hi2";

export default function AddYourStore() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [isServiceAvailable, setIsServiceAvailable] = useState(false);

    const [storeData, setStoreData] = useState({
        name: "",
        ownerFirstName: "",
        ownerLastName: "",
        ownerEmail: "",
        productsType: "",
        productsDescription: "",
        image: null,
    });

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [isWaitStatus, setIsWaitStatus] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const storeImageFileElementRef = useRef();

    const { i18n, t } = useTranslation();

    useEffect(() => {
        const userLanguage = localStorage.getItem("asfour-store-language");
        handleSelectUserLanguage(userLanguage === "ar" || userLanguage === "en" || userLanguage === "tr" || userLanguage === "de" ? userLanguage : "en");
        getAppearedSections()
            .then(async (result) => {
                const appearedSectionsLength = result.data.length;
                if (appearedSectionsLength > 0) {
                    for (let i = 0; i < appearedSectionsLength; i++) {
                        if (result.data[i].sectionName === "add your store" && result.data[i].isAppeared) {
                            setIsServiceAvailable(true);
                        }
                    }
                }
                setIsLoadingPage(false);
            })
            .catch((err) => {
                setIsLoadingPage(false);
                setIsErrorMsgOnLoadingThePage(true);
            });
    }, []);

    const handleSelectUserLanguage = (userLanguage) => {
        i18n.changeLanguage(userLanguage);
        document.body.lang = userLanguage;
    }

    const getAppearedSections = async () => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/appeared-sections/all-sections`);
            return res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const validateFormFields = (validateDetailsList) => {
        return validations.inputValuesValidation(validateDetailsList);
    }

    const createNewStore = async (e) => {
        try {
            e.preventDefault();
            setFormValidationErrors({});
            let errorsObject = validateFormFields([
                {
                    name: "name",
                    value: storeData.name,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                    },
                },
                {
                    name: "ownerFirstName",
                    value: storeData.ownerFirstName,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                    },
                },
                {
                    name: "ownerLastName",
                    value: storeData.ownerLastName,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                    },
                },
                {
                    name: "ownerEmail",
                    value: storeData.ownerEmail,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                        isEmail: {
                            msg: "Sorry, This Email Is Not Valid !!",
                        }
                    },
                },
                {
                    name: "productsType",
                    value: storeData.productsType,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                    },
                },
                {
                    name: "productsDescription",
                    value: storeData.productsDescription,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                    },
                },
                {
                    name: "image",
                    value: storeData.image,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                        isImage: {
                            msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or WEBP Image File !!",
                        },
                    },
                },
            ]);
            setFormValidationErrors(errorsObject);
            if (Object.keys(errorsObject).length == 0) {
                let formData = new FormData();
                formData.append("name", storeData.name);
                formData.append("ownerFirstName", storeData.ownerFirstName);
                formData.append("ownerLastName", storeData.ownerLastName);
                formData.append("ownerEmail", storeData.ownerEmail);
                formData.append("productsType", storeData.productsType);
                formData.append("productsDescription", storeData.productsDescription);
                formData.append("storeImg", storeData.image);
                setIsWaitStatus(true);
                const res = await axios.post(`${process.env.BASE_API_URL}/stores/create-new-store`, formData);
                const result = res.data;
                setIsWaitStatus(false);
                console.log(result);
                if (!result.error) {
                    setSuccessMsg(result.msg);
                    let successTimeout = setTimeout(() => {
                        setSuccessMsg("");
                        setStoreData({
                            name: "",
                            ownerFirstName: "",
                            ownerLastName: "",
                            ownerEmail: "",
                            productsType: "",
                            productsDescription: "",
                            image: null,
                        });
                        storeImageFileElementRef.current.value = "";
                        clearTimeout(successTimeout);
                    }, 1500);
                } else {
                    setErrorMsg(result.msg);
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errorTimeout);
                    }, 1500);
                }
            }
        }
        catch (err) {
            setIsWaitStatus(false);
            setErrorMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    return (
        <div className="add-your-store page">
            <Head>
                <title>Ubuyblues Store - Add Your Store</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        {isServiceAvailable ? <section className="add-your-store pb-5">
                            <h2 className="section-name text-center mb-4 text-white">{t("Add Your Store")}</h2>
                            <form className="add-your-store-form w-50 mx-auto" onSubmit={createNewStore}>
                                <section className="name mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-name-field ${formValidationErrors["name"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your Store Name")}
                                        onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                                        value={storeData.name}
                                    />
                                    {formValidationErrors["name"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["name"])}</span>
                                    </p>}
                                </section>
                                <section className="owner-first-name mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-owner-first-name-field ${formValidationErrors["ownerFirstName"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your First Name")}
                                        onChange={(e) => setStoreData({ ...storeData, ownerFirstName: e.target.value })}
                                        value={storeData.ownerFirstName}
                                    />
                                    {formValidationErrors["ownerFirstName"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["ownerFirstName"])}</span>
                                    </p>}
                                </section>
                                <section className="owner-last-name mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-owner-last-name-field ${formValidationErrors["ownerLastName"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your Last Name")}
                                        onChange={(e) => setStoreData({ ...storeData, ownerLastName: e.target.value })}
                                        value={storeData.ownerLastName}
                                    />
                                    {formValidationErrors["ownerLastName"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["ownerLastName"])}</span>
                                    </p>}
                                </section>
                                <section className="owner-email mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-owner-email-field ${formValidationErrors["ownerEmail"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your Email")}
                                        onChange={(e) => setStoreData({ ...storeData, ownerEmail: e.target.value })}
                                        value={storeData.ownerEmail}
                                    />
                                    {formValidationErrors["ownerEmail"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{formValidationErrors["ownerEmail"]}</span>
                                    </p>}
                                </section>
                                <section className="store-products-type mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-products-type-field ${formValidationErrors["productsType"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your Products Type")}
                                        onChange={(e) => setStoreData({ ...storeData, productsType: e.target.value })}
                                        value={storeData.productsType}
                                    />
                                    {formValidationErrors["productsType"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["productsType"])}</span>
                                    </p>}
                                </section>
                                <section className="store-products-description mb-4">
                                    <input
                                        type="text"
                                        className={`form-control p-3 border-2 store-products-description-field ${formValidationErrors["productsDescription"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder={t("Please Enter Your Products Description")}
                                        onChange={(e) => setStoreData({ ...storeData, productsDescription: e.target.value })}
                                        value={storeData.productsDescription}
                                    />
                                    {formValidationErrors["productsDescription"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["productsDescription"])}</span>
                                    </p>}
                                </section>
                                <section className="image mb-4">
                                    <input
                                        type="file"
                                        className={`form-control p-2 border-2 product-image-field ${formValidationErrors["image"] ? "border-danger mb-3" : "mb-4"}`}
                                        placeholder="Please Enter Product Image"
                                        onChange={(e) => setStoreData({ ...storeData, image: e.target.files[0] })}
                                        ref={storeImageFileElementRef}
                                        value={storeImageFileElementRef.current?.value}
                                    />
                                    {formValidationErrors["image"] && <p className="bg-danger p-2 form-field-error-box m-0 text-white">
                                        <span className="me-2"><HiOutlineBellAlert className="alert-icon" /></span>
                                        <span>{t(formValidationErrors["image"])}</span>
                                    </p>}
                                </section>
                                {!isWaitStatus && !successMsg && !errorMsg && <button
                                    type="submit"
                                    className="btn btn-success w-50 d-block mx-auto p-2 global-button"
                                >
                                    {t("Add Now")}
                                </button>}
                                {isWaitStatus && <button
                                    type="button"
                                    className="btn btn-danger w-50 d-block mx-auto p-2 global-button"
                                    disabled
                                >
                                    {t("Waiting Add New Store")} ...
                                </button>}
                                {errorMsg && <button
                                    type="button"
                                    className="btn btn-danger w-50 d-block mx-auto p-2 global-button"
                                    disabled
                                >
                                    {t(errorMsg)}
                                </button>}
                                {successMsg && <button
                                    type="button"
                                    className="btn btn-success w-75 d-block mx-auto p-2 global-button"
                                    disabled
                                >
                                    {t(successMsg)}
                                </button>}
                            </form>
                        </section> : <NotFoundError errorMsg="Sorry, This Service Is Not Available Now !!" />}
                    </div>
                    <Footer />
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div >
    );
}