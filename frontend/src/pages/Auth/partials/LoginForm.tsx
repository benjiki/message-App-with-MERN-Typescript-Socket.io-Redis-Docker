import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuthStore } from "../../../stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/authService";
import type { AxiosError } from "axios"; // ✅ import type only

import { toast } from "sonner";
import { AtSign, Lock } from "lucide-react";

interface LoginFormProps {
  onSwitch: () => void;
}
const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { user } = data;
      setUser(user);
      toast.success("Login successfull");
      return navigate("/");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        success?: boolean;
        message?: string;
        errors?: string[];
      }>;

      const msg =
        axiosError.response?.data?.message || // AppError
        axiosError.response?.data?.errors?.join(", ") || // Joi validation
        "Login failed"; // fallback

      toast.error(msg);
    },
  });
  const onSubmit = (data: LoginFormData) => mutation.mutate(data);

  return (
    <>
      <h2 className="text-2xl font-bold text-coffeeText mb-2">
        Sign In To Your Account
      </h2>
      <p className="text-coffeeTextAlt text-sm mb-8">Go to the community ☕</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-coffeePrimary hover:bg-coffeeDark text-white py-3 rounded-lg text-sm font-medium transition-colors"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "..." : "Login Account"}
        </button>
      </form>

      <p className="text-sm text-coffeeTextAlt mt-6 text-center">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-coffeeAccent hover:underline font-medium"
        >
          Sign up
        </button>
      </p>
    </>
  );
};

export default LoginForm;
