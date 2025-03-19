"use client";
import { Logo } from "@/utils/Logo/Logo";
import React, { useEffect, useState } from "react";

import "./ContactForm.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ContactTitle } from "@/lib/helpers/anim";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";

export const ContactForm = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(data?.contact.email.errorMessage)
      .required(data?.contact.email.errorMessage),
    name: Yup.string().required(data?.contact.name.errorMessage),
    phone: Yup.string().required(data?.contact.phone.errorMessage),
    message: Yup.string(),
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

      // Use the server action directly instead of fetch
      const result = await sendEmail(emailData);

      if (result.success) {
        console.log("Email sent successfully");
        setSubmitted(true);
        resetForm();
      } else {
        console.error("Failed to send email:", result.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error (you might want to show an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="top">
        <Logo className="contact-form__logo" />
        <div className="contact-form__title">
          <h2>{data.title.top}</h2>
          <AnimTitle titles={data.title.middle} />
          <h2>{data.title.bottom}</h2>
        </div>
      </div>
      <Formik
        initialValues={{
          email: "",
          name: "",
          phone: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <div className="form-wrapper">
            {submitted && (
              <div className="form-success-message">
                <h2 className="upperCase">
                  {data.contact?.successTitle?.text}
                </h2>
                <p>{data.contact?.successTitle?.subtext}</p>
              </div>
            )}
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
            </Form>
          </div>
        )}
      </Formik>
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
        <motion.h2
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
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};
