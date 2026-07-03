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
    date: Yup.string().required("Date is required"),
  });

  return (
    <div className="min-h-screen flex bg-[#F8FAFB] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-[28px] font-bold text-[#1A2B45]">
          Book Appointment
        </h1>

        <p className="text-[#6B7A92] text-sm mt-1 mb-8">
          Schedule your visit in seconds
        </p>

        <Formik
          initialValues={{
            name: "",
            date: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const data = await bookPatient({
                name: values.name,
                appointmentDate: values.date || undefined,
              });

              notifySuccess("Booked Successfully");

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
                <label className="text-sm text-[#6B7A92] font-medium">
                  Full Name
                </label>

                <Field
                  name="name"
                  placeholder="Enter your name"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white placeholder:text-gray-300 "
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="text-sm text-[#6B7A92] font-medium">
                  Appointment Date
                </label>

                <Field
                  name="date"
                  type="date"
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-gray-300 "
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

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#1A6BCC] text-white font-medium"
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
