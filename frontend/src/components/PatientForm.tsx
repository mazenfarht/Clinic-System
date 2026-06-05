"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { bookPatient } from "../services/queue";
import { notifyError, notifySuccess } from "@/src/lib/notify";
import { getSlots } from "../services/slot";

export default function PatientForm() {
  const router = useRouter();
  const [slots, setSlots] = useState<string[]>([]);

  const fetchSlots = async (date: string) => {
    const available = await getSlots(date);
    setSlots(available);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must contain only digits")
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone must be at most 15 digits")
      .required("Phone is required"),

    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
  });

  return (
    <div className="min-h-screen flex bg-[#F8FAFB] items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <h1 className="text-[28px] font-bold text-[#1A2B45]">
          Book Appointment
        </h1>

        <p className="text-[#6B7A92] text-sm mt-1 mb-8">
          Schedule your visit in seconds
        </p>

        {/* FORM */}
        <Formik
          initialValues={{
            name: "",
            phone: "",
            date: "",
            time: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const data = await bookPatient({
                name: values.name,
                phone: values.phone,
                appointmentDate: values.date,
                appointmentTime: values.time,
              });

              localStorage.setItem("clinic_token", data.token);
              notifySuccess("Success Of Booking");
              router.replace("/display");
            } catch (err: any) {
              notifyError(err?.response?.data?.error || "Something went wrong");
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              {/* NAME */}
              <div>
                <label className="text-xs text-[#6B7A92] font-medium">
                  Full Name
                </label>

                <Field
                  name="name"
                  placeholder="Enter your name"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45]
                  focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-xs text-[#6B7A92] font-medium">
                  Phone Number
                </label>

                <Field
                  name="phone"
                  placeholder="Enter phone number"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45]
                  focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
                />

                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="text-xs text-[#6B7A92] font-medium">
                  Appointment Date
                </label>

                <Field
                  name="date"
                  type="date"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45]
                  focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
                  onChange={(e: any) => {
                    setFieldValue("date", e.target.value);
                    fetchSlots(e.target.value);
                  }}
                />

                <ErrorMessage
                  name="date"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* SLOT */}
              <div>
                <label className="text-xs text-[#6B7A92] font-medium">
                  Time Slot
                </label>

                <Field
                  as="select"
                  name="time"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45]
                  focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
                >
                  <option value="">Select time slot</option>

                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="time"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#1A6BCC] text-white font-medium shadow-lg shadow-blue-200
                hover:bg-[#155AB5] transition"
              >
                Book Appointment →
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
