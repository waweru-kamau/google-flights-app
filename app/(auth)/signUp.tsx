import Container from "@/components/ui/Container";
import FormInput from "@/components/ui/FormInput";
import CustomText from "@/components/ui/CustomText";
import GoogleLogo from "@/assets/svg/GoogleLogo";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormValues, signUpSchema } from "@/lib/zodSchema";
import { useAuth } from "@/lib/auth";
import { View } from "react-native";
import { router } from "expo-router";

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirm: "" },
  });

  const { signup } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signup(data.email, data.password);
  });
  return (
    <Container className="gap-6">
      <GoogleLogo />
      <CustomText variant="h1" numberOfLines={2}>
        Create a Google Account
      </CustomText>
      <CustomText variant="h3" className="mb-4">
        Enter your details
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
      <FormInput
        label="Confirm Password"
        name="confirm"
        control={control}
        placeholder="********"
        secureTextEntry
      />
      <View className="flex-row items-center justify-between">
        <PrimaryButton
          variant="text"
          title="Sign in"
          onPress={() => router.replace("/login")}
        />
        <PrimaryButton title="Next" onPress={onSubmit} />
      </View>
    </Container>
  );
}
