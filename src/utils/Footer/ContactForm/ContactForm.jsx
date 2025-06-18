"use client";
import { Logo } from "@/utils/Logo/Logo";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ContactForm.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ContactTitle } from "@/lib/helpers/anim";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";
import { URL_FORM_POST } from "@/lib/helpers/DataUrls";


export const ContactForm = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(data?.contact.email.errorMessage)
      .required(data?.contact.email.errorMessage),
    name: Yup.string().required(data?.contact.name.errorMessage),
    phone: Yup.string().required(data?.contact.phone.errorMessage),
    message: Yup.string(),
    accept: Yup.boolean().oneOf(
      [true],
      data?.contact.acceptError || "You must accept the privacy policy"
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Format data for the email service
      const emailData = {
        email: values.email,
        phone: values.phone,
        name: values.name,
        message: values.message,
      };

      // Send POST request using axios
      const response = await axios.post(URL_FORM_POST, emailData);

      if (response.status === 200 || response.status === 201) {
        console.log("Email sent successfully");
        setSubmitted(true);
        resetForm();
      } else {
        console.error("Failed to send email:", response.data);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.message
      );
      // Handle error (you might want to show an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form" id="contact">
      <Formik
        initialValues={{
          email: "",
          name: "",
          phone: "",
          message: "",
          accept: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <div className="form-wrapper">
            {submitted && (
              <div className="form-success-message">
                <h2>
                  {data.contact?.successTitle?.text}
                </h2>
                <p>{data.contact?.successTitle?.subtext}</p>
              </div>
            )}
            <h2 className="form__title">{data?.topTitle}</h2>
            <Form
              className={clsx("form", {
                "form--submitted": submitted,
              })}
            >
              <div className="input-wrapper">
                <Field
                  type="email"
                  name="email"
                  placeholder={data.contact.email.text}
                  className={clsx("input", {
                    "input--error": errors.email && touched.email,
                  })}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="input-error-msg small-text"
                />
              </div>

              <div className="input-wrapper">
                <Field
                  type="text"
                  name="name"
                  placeholder={data.contact.name.text}
                  className={clsx("input", {
                    "input--error": errors.name && touched.name,
                  })}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="input-error-msg small-text"
                />
              </div>

              <div className="input-wrapper">
                <Field
                  type="tel"
                  name="phone"
                  placeholder={data.contact.phone.text}
                  className={clsx("input", {
                    "input--error": errors.phone && touched.phone,
                  })}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="input-error-msg small-text"
                />
              </div>

              <div className="input-wrapper">
                <Field
                  as="textarea"
                  name="message"
                  placeholder={data.contact.message.text}
                  className="input textarea"
                />
              </div>

              <div className="form-bottom">
                <label htmlFor="accept" className="accept-wrapper">
                  <Field name="accept">
                    {({ field, form }) => (
                      <span
                        className={clsx("custom-checkbox", {
                          checked: field.value,
                          error: form.touched.accept && form.errors.accept,
                        })}
                        tabIndex={0}
                        role="checkbox"
                        aria-checked={field.value}
                        onClick={() =>
                          form.setFieldValue("accept", !field.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            form.setFieldValue("accept", !field.value);
                          }
                        }}
                      >
                          <svg width="18" height="18" viewBox="0 0 18 18">
                            <polyline
                              points="4,10 8,14 14,6"
                              style={{
                                fill: "none",
                                stroke: "#fff",
                                strokeWidth: 2,
                              }}
                            />
                          </svg>
                      </span>
                    )}
                  </Field>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.contact.privacyText.text,
                    }}
                    className="accept-text small-text"
                  />
                </label>
                <ErrorMessage
                  name="accept"
                  component="p"
                  className="input-error-msg small-text"
                />{" "}
                <button
                  type="submit"
                  className={clsx("submit-button button button--black", {
                    "submit-button--disabled": !isValid || !dirty,
                  })}
                  disabled={!isValid || !dirty}
                >
                  <p className="button__text-wrapper">
                    {data.contact.button.split("").map((word, index) => (
                      <span
                        className="button__text"
                        key={index}
                        style={{ transitionDelay: `${index * 0.01}s` }}
                      >
                        {word !== " " ? word : <>&nbsp;</>}
                      </span>
                    ))}
                  </p>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      <div className="bottom">
        <div className="bottom__title">
          <div>
            <span>{data.title.top}</span>
            <AnimTitle titles={data.title.middle} />
          </div>
          <span>{data.title.bottom}</span>
        </div>
        <Logo className="contact-form__logo" />
      </div>
    </div>
  );
};

const AnimTitle = ({ titles }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="title-anim__wrapper">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          className="title-anim"
          key={titles[activeIndex]}
          aria-label={titles[activeIndex]}
        >
          {titles[activeIndex].split("").map((currL, i) => (
            <motion.span
              key={i}
              style={{ display: "inline-block" }}
              {...anim(ContactTitle)}
              custom={(i / titles[activeIndex].split("").length) * 0.08}
            >
              {currL}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
