
import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, UserRound, LockKeyhole, ArrowRight } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const strength = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[0-9]/.test(form.password),
    /[^A-Za-z0-9]/.test(form.password),
  ].filter(Boolean).length;

  const strengthLabels = ["Enter a password", "Weak", "Fair", "Good", "Strong"];

  const fields = [
    { name: "name", label: "Full Name", icon: UserRound, type: "text" },
    { name: "email", label: "Email Address", icon: Mail, type: "email" },
    { name: "password", label: "Password", icon: LockKeyhole, type: showPassword ? "text" : "password" },
    { name: "confirmPassword", label: "Confirm Password", icon: LockKeyhole, type: showConfirm ? "text" : "password" },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (strength < 3) {
      setMessage("Please choose a stronger password.");
      return;
    }

    setMessage("Form validated! Backend signup connection comes next.");
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-[450px] rounded-[30px] border border-[#28634f] bg-green-secondary/70 p-7 shadow-2xl sm:p-9"
    >
      <p className="text-sm tracking-[0.25em] text-champagne">
        YOUR JOURNEY BEGINS HERE
      </p>

      <h2
        className="mt-3 text-5xl text-white"
        style={{ fontFamily: '"Great Vibes", cursive' }}
      >
        Create Account
      </h2>

      <p className="mb-7 mt-3 text-sm text-ivory">
        A little step toward a more peaceful, purposeful day.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const passwordField = field.name === "password";
          const confirmField = field.name === "confirmPassword";

          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold text-ivory"
              >
                {field.label}
              </label>

              <div className="flex items-center rounded-2xl border border-[#487866] bg-forest/70 px-4 transition focus-within:border-champagne focus-within:ring-2 focus-within:ring-champagne/20">
                <Icon size={18} className="shrink-0 text-champagne" />

                <input
                  id={field.name}
                  type={field.type}
                  required
                  minLength={passwordField ? 8 : undefined}
                  autoComplete={
                    field.name === "name" ? "name" :
                    field.name === "email" ? "email" :
                    "new-password"
                  }
                  value={form[field.name]}
                  onChange={(e) => {
                    setForm({ ...form, [field.name]: e.target.value });
                    setMessage("");
                  }}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-[#8eafa2]"
                />

                {(passwordField || confirmField) && (
                  <button
                    type="button"
                    aria-label={
                      field.type === "password" ? "Show password" : "Hide password"
                    }
                    onClick={() =>
                      passwordField
                        ? setShowPassword(!showPassword)
                        : setShowConfirm(!showConfirm)
                    }
                    className="text-ivory transition hover:text-champagne"
                  >
                    {field.type === "password" ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                )}
              </div>

              {passwordField && form.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          n <= strength ? "bg-champagne" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-ivory">
                    Password strength: {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {message && (
          <p role="status" className="text-center text-sm text-champagne">
            {message}
          </p>
        )}

        <motion.button
          type="submit"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#368c6a] bg-accent-green px-6 py-4 font-bold text-white shadow-[0_6px_0_#063b2e,0_12px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_#063b2e,0_8px_28px_rgba(217,197,139,0.18)]"
        >
          Create My Account <ArrowRight size={18} />
        </motion.button>
      </form>

      <p className="mt-7 text-center text-sm text-ivory">
        Already have an account?{" "}
        <span className="cursor-pointer font-bold text-champagne underline underline-offset-4">
          Log In
        </span>
      </p>
    </motion.section>
  );
}
