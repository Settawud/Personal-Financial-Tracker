const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message ?? "Request failed");
  }

  return res.json();
}

export const api = {
  transactions: {
    list: (params?: { from?: string; to?: string }) => {
      const search = new URLSearchParams();
      if (params?.from) search.set("from", params.from);
      if (params?.to) search.set("to", params.to);
      const qs = search.toString();
      return request<{ data: unknown[]; error?: string; message?: string }>(`/transactions${qs ? `?${qs}` : ""}`);
    },
    getById: (id: string) => request<{ data: unknown; error?: string; message?: string }>(`/transactions/${id}`),
    create: (body: unknown) =>
      request<{ data: unknown; error?: string; message?: string }>("/transactions", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: unknown) =>
      request<{ data: unknown; error?: string; message?: string }>(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      request<{ message?: string }>(`/transactions/${id}`, { method: "DELETE" }),
  },

  summary: {
    get: (params?: { from?: string; to?: string }) => {
      const search = new URLSearchParams();
      if (params?.from) search.set("from", params.from);
      if (params?.to) search.set("to", params.to);
      const qs = search.toString();
      return request<{ data: unknown }>(`/summary${qs ? `?${qs}` : ""}`);
    },
  },

  categories: {
    list: () => request<{ data: unknown[] }>("/categories"),
  },
};