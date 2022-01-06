import React, { useState } from "react";
import "./Contact.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useHistory } from "react-router-dom";

function Contact() {
  const history = useHistory();

  init("user_Z1iEC8RXZuNkJR3FMOKor");

  const [sent, setSent] = useState(false);
  const [notSent, setNotSent] = useState(false);
  const [progress, setProgress] = useState(false);

  const formik = useFormik({
    initialValues: {
      from_name: "",
      to_name: "alokojoseph7@gmail.com",
      subject: "",
      reply_to: "",
      message: "",
    },
    validationSchema: Yup.object({
      from_name: Yup.string().required("*required"),
      subject: Yup.string().required("* required"),
      reply_to: Yup.string()
        .email("Invalid email address")
        .required("*required"),
      message: Yup.string().required("*required"),
    }),
    onSubmit: (values) => {
      setProgress(true);
      emailjs
        .send(
          "service_d28ui5l",
          "template_95xmlg9",
          values,
          "user_Z1iEC8RXZuNkJR3FMOKor"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            setSent(true);
            setProgress(false);
            setTimeout(() => {
              history.push("/");
            }, 2000);
          },
          function (error) {
            console.log("FAILED...", error);
            setNotSent(true);
          }
        );
    },
  });

  return (
    <div className="contactContainer">
      <div className="contactWrapper">
        <div className="contactWriteUps">
          <div className="contactTitle">
            <h2 className="contactTitle">REACH OUT TO THE DEVELOPER </h2>
          </div>
          <form
            className="formWrapper"
            id="contact-form"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              className="emailInput"
              placeholder="Enter Your Name"
              id="from_name"
              name="from_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.from_name}
            />
            {formik.touched.from_name && formik.errors.from_name ? (
              <div className="error">{formik.errors.from_name}</div>
            ) : null}
            <input
              type="text"
              className="emailInput"
              placeholder="Enter Your Email"
              id="reply_to"
              name="reply_to"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.reply_to}
            />
            {formik.touched.reply_to && formik.errors.reply_to ? (
              <div className="error">{formik.errors.reply_to}</div>
            ) : null}
            <input
              type="text"
              className="emailInput"
              placeholder="Enter a Subject...."
              id="subject"
              name="subject"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="error">{formik.errors.subject}</div>
            ) : null}
            <textarea
              className="textArea"
              placeholder="Please leave your message...."
              id="message"
              name="message"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="error">{formik.errors.message}</div>
            ) : null}
            {sent ? null : (
              <div className="buttonWrapper">
                <button className="submitMessage" type="submit">
                  {progress ? (
                    <CircularProgress
                      color="success"
                      style={{ backgroundColor: "transparent" }}
                    />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            )}
            {sent && (
              <div className="successAlert">
                <CheckCircleOutlineIcon
                  style={{ color: "white", marginRight: "10px" }}
                />
                <span>Message Delivered Successfully</span>
              </div>
            )}
            {notSent && (
              <div className="failAlert">
                <WarningAmberIcon
                  style={{ color: "white", marginRight: "10px" }}
                />
                <span>
                  oops!! Something went wrong! Reach out to me directly via.
                  alokojoseph7@gmail.com
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
