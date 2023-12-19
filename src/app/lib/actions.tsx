"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitLinkedinUrl(formData: FormData) {
  console.log(formData);
  //   const validatedFields = CreateInvoice.safeParse({
  //     customerId: formData.get("customerId"),
  //     amount: formData.get("amount"),
  //     status: formData.get("status"),
  //   });

  //   if (!validatedFields.success) {
  //     return {
  //       errors: validatedFields.error.flatten().fieldErrors,
  //       message: "Missing Fields. Failed to Create Invoice.",
  //     };
  //   }

  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  // try {
  //   await sql`
  //       INSERT INTO invoices (customer_id, amount, status, date)
  //       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  //     `;
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to Create Invoice.',
  //   };
  // }

  // revalidatePath("/dashboard/invoices");
  // redirect("/dashboard/invoices");
}
