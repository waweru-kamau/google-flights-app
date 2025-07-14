import Container from "@/components/ui/Container";
import FormInput from "@/components/ui/FormInput";
import CustomText from "@/components/ui/CustomText";
import GoogleLogo from "@/assets/svg/GoogleLogo";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "@/lib/zodSchema";
import { useAuth } from "@/lib/auth";
import { View } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { login } = useAuth();

  const onSubmit = handleSubmit((data) => {
    login(data.email, data.password);
  });
  return (
    <Container className="gap-6">
      <GoogleLogo />
      <CustomText variant="h1">Sign in</CustomText>
      <CustomText variant="h3" className="mb-4">
        Use your Google Account
      </CustomText>
      <FormInput
        label="Email"
        name="email"
        control={control}
        placeholder="example@gmail.com"
        keyboardType="email-address"
      />
      <FormInput
        label="Password"
        name="password"
        control={control}
        placeholder="********"
        secureTextEntry
      />
      <View className="flex-row items-center justify-between">
        <PrimaryButton
          variant="text"
          title="Create account"
          onPress={() => router.replace("/signUp")}
        />
        <PrimaryButton title="Next" onPress={onSubmit} />
      </View>
    </Container>
  );
}
