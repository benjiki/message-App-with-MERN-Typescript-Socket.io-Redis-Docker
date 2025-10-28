import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/authService";
import { toast } from "sonner";
import type { AxiosError } from "axios"; // ✅ import type only
import { AtSign, Lock, User, UserCircle } from "lucide-react";

interface RegFormProps {
  onSwitch: () => void;
}

const regSchema = z
  .object({
    fullName: z.string().trim().min(3, { message: "Full name is too short" }),

    username: z
      .string()
      .regex(/^[a-zA-Z0-9]+$/, {
        message:
          "Username can only contain lowercase letters, numbers, and underscores",
      })
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(12, { message: "Username must be at most 12 characters long" })
      .transform((val) => val.toLowerCase()),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 6 characters" }),
    confirmpassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "password and confirmpassword do not  match",
    path: ["confirmpassword"],
  });

type RegFormData = z.infer<typeof regSchema>;
const RegForm: React.FC<RegFormProps> = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(regSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      onSwitch();
      toast.success("Account Created go and sign in ");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ errors?: string[] }>;
      const msg =
        axiosError.response?.data?.errors?.join(", ") ?? "Registration failed";
      toast.error(msg);
    },
  });
  const onSubmit = (data: RegFormData) => mutation.mutate(data);

  return (
    <>
      <h2 className="text-2xl font-bold text-coffeeText mb-2">
        Create Account
      </h2>
      <p className="text-coffeeTextAlt text-sm mb-8">Join the community ☕</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-coffeeText text-sm mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-coffeeAccent size-5" />
            <input
              {...register("fullName")}
              id="fullName"
              autoComplete="off"
              placeholder="Your full name"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-coffeeText text-sm focus:outline-none focus:ring-2 focus:ring-coffeeLight"
            />
          </div>
          {errors.fullName && (
            <p className="text-coffeeError text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-coffeeText text-sm mb-1"
          >
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-coffeeAccent size-5" />
            <input
              {...register("username")}
              id="username"
              autoComplete="off"
              placeholder="username123"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-coffeeText text-sm focus:outline-none focus:ring-2 focus:ring-coffeeLight"
            />
          </div>
          {errors.username && (
            <p className="text-coffeeError text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-coffeeText text-sm mb-1">
            Email
          </label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-coffeeAccent size-5" />
            <input
              {...register("email")}
              id="email"
              autoComplete="off"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-coffeeText text-sm focus:outline-none focus:ring-2 focus:ring-coffeeLight"
            />
          </div>
          {errors.email && (
            <p className="text-coffeeError text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-coffeeText text-sm mb-1"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffeeAccent size-5" />
            <input
              {...register("password")}
              id="password"
              autoComplete="off"
              type="password"
              placeholder="••••••"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-coffeeText text-sm focus:outline-none focus:ring-2 focus:ring-coffeeLight"
            />
          </div>
          {errors.password && (
            <p className="text-coffeeError text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-coffeeText text-sm mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffeeAccent size-5" />
            <input
              {...register("confirmpassword")}
              id="confirmpassword"
              type="password"
              autoComplete="off"
              placeholder="Confirm password"
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 text-coffeeText text-sm focus:outline-none focus:ring-2 focus:ring-coffeeLight"
            />
          </div>
          {errors.confirmpassword && (
            <p className="text-coffeeError text-sm mt-1">
              {errors.confirmpassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-coffeePrimary hover:bg-coffeeDark text-white py-3 rounded-lg text-sm font-medium transition-colors"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-coffeeTextAlt mt-6 text-center">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-coffeeAccent hover:underline font-medium"
        >
          Sign in
        </button>
      </p>
    </>
  );
};

export default RegForm;
