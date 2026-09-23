import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await api.getMessages();
        setMessages(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-500">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="border-b border-neutral-300 pb-8">
          <p className="eyebrow text-neutral-400">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight">
            Messages
          </h1>
        </div>

        {error && (
          <p className="border-b border-red-200 py-5 text-sm text-red-600">
            {error}
          </p>
        )}

        {messages.length === 0 ? (
          <div className="py-20">
            <p className="text-sm text-neutral-500">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {messages.map((message) => (
              <article
                key={message.id}
                className="bg-white p-6 sm:p-8"
              >
                <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-light">
                      {message.name}
                    </h2>

                    <a
                      href={`mailto:${message.email}`}
                      className="mt-2 block text-sm text-neutral-500 transition-opacity hover:opacity-50"
                    >
                      {message.email}
                    </a>

                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="mt-1 block text-sm text-neutral-500 transition-opacity hover:opacity-50"
                      >
                        {message.phone}
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400">
                    {new Date(
                      message.created_at,
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="pt-6">
                  <p className="whitespace-pre-line text-sm leading-7 text-neutral-600">
                    {message.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}