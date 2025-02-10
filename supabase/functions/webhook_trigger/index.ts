import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.4";

console.log("🚀 Edge Function for KonfHub Webhook Trigger is Running");

const SUPABASE_URL = Deno.env.get("ENV_SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("ENV_SUPABASE_SERVICE_ROLE_KEY");

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseClient = createClient(
    Deno.env.get("API_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("API_SUPABASE_SERVICE_ROLE_KEY") ??
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
      "",
  );

  try {
    const { record } = await req.json();

    const { id, team_memebers, user_id } = record;

    console.log(id, team_memebers, user_id);
    const team_members = team_memebers;

    if (team_members.length === 0) {
      return new Response(
        JSON.stringify({ error: "No team members found in the payload" }),
        { status: 400 },
      );
    }

    const { data, error } = await supabaseClient
      .from("users")
      .select("email")
      .eq("id", user_id)
      .single();
    const email = data.email;

    const firstParticipant = team_members[0];
    const event_name = "Launchpad - Shreshta'25";

    // Prepare the payload structure matching the KonfHub webhook
    const payload = {
      Data: {
        "Attendee Details": {
          "Ticket Details": {
            "Ticket Name": event_name,
          },
          Name: firstParticipant?.name || "Anonymous",
          "Email Address": email || "No Email",
          "Phone Number": firstParticipant?.phone_number || "No Phone",

          "Booking Id": id || "No Booking ID",
          Institution: firstParticipant?.college_name || "No Institution",
        },
      },
    };

    console.log("📤 Sending payload to KonfHub Webhook:", payload);

    const webhookResponse = await fetch("https://webhook.rovn.me/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseBody = await webhookResponse.json();
    console.log("✅ Webhook Response:", responseBody);

    return new Response(
      JSON.stringify({ message: "Payload sent successfully", responseBody }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error("❌ Error processing the request:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
