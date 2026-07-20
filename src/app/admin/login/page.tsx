"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLoginSchema } from "@/lib/validations/registration";
import { zodFieldErrors, scrollToFirstFormIssue } from "@/lib/validations/form-utils";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { FormAlert } from "@/components/forms/FormAlert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = adminLoginSchema.safeParse({ username, password });
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      scrollToFirstFormIssue();
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-pad container-site flex min-h-[70vh] items-center justify-center">
      <form onSubmit={submit} className="glass w-full max-w-md space-y-4 rounded-3xl p-6" noValidate>
        <h1 className="display text-4xl text-white">Admin login</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Default local credentials come from env (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
        </p>
        {error && <FormAlert type="error" title="Login failed" message={error} />}
        <FormField label="Username" required error={errors.username} htmlFor="admin-username">
          <input
            id="admin-username"
            className={fieldClassName("input", !!errors.username)}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            autoComplete="username"
          />
        </FormField>
        <FormField label="Password" required error={errors.password} htmlFor="admin-password">
          <input
            id="admin-password"
            className={fieldClassName("input", !!errors.password)}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            autoComplete="current-password"
          />
        </FormField>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
